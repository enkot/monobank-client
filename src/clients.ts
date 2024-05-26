import type {
  AccessResponse,
  AccountStatementParams,
  ClientInfo,
  CompanyInfo,
  Currency,
  MonoCorporateOptions,
  MonoOptions,
  MonoRegistrarOptions,
  Registration,
  RegistrationBody,
  RegistrationStatus,
  RegistrationStatusBody,
  Statement,
  WebhookBody,
} from './types'
import { ApiClient } from './api'
import { Signer } from './signer'
import { getTime } from './utils'
import endpoints from './endpoints'

export const BASE_URL = 'https://api.monobank.ua'

export abstract class MonoBase extends ApiClient {
  /**
   * Get a basic list of monobank currency rates. Information is cached and updated no more than once every 5 minutes.
   */
  static async getCurrencyList(): Promise<Currency[]> {
    return await ApiClient.fetch(endpoints.CURRENCY_LIST)
  }

  /**
   * Get a basic list of monobank currency rates. Information is cached and updated no more than once every 5 minutes.
   */
  async getCurrencyList(): Promise<Currency[]> {
    return await MonoBase.getCurrencyList()
  }

  /**
   * Obtaining information about the client and a list of his accounts
   */
  async getClientInfo(): Promise<ClientInfo> {
    return await this.sign().fetch(endpoints.CLIENT_INFO)
  }

  /**
   * Get a statement for the time from {from} to {to} time in seconds in Unix time format. The maximum time for which it is possible to receive a statement is 31 days + 1 hour (2682000 seconds).
   * The limit for using the function is no more than 1 time per 60 seconds.
   * Returns 500 transactions from the end, that is, from time to to time from. If the number of transactions = 500, you need to make another request, reducing the time to to the time of the last payment, from the response. If again the number of transactions = 500, then execute requests until the number of transactions is < 500. Accordingly, if the number of transactions is < 500, then all payments for the specified period have already been received.
   */
  async getAccountStatement(params: AccountStatementParams): Promise<Statement[]> {
    return await this.sign().fetch(endpoints.ACCOUNT_STATEMENT, {
      params: {
        ...params,
        to: params.to || undefined,
      },
    })
  }

  protected abstract sign(): this

  /**
   * Setting up a webhook to receive updates on customer payments
   * - To confirm the correctness of the provided address, a GET request is sent to it. The server must respond strictly with the HTTP status code 200, and nothing else. If the validation is successful, POST requests with events begin to be sent to the given address.
   * - Events are sent in the following form: POST request to the given address in the format {type:"StatementItem", data:{account:"...", statementItem:{#StatementItem}}}. If the user service does not respond to the command within 5 seconds, the service will try again after another 60 and 600 seconds. If no response is received on the third attempt, the function will be disabled. The server response must strictly contain HTTP status code 200.
   */
  abstract setupWebhook(body: WebhookBody): Promise<Record<string, never>>
}

export class Mono extends MonoBase {
  private token: string

  constructor({ token, baseURL = BASE_URL }: MonoOptions) {
    super({ baseURL })

    this.token = token
  }

  protected sign() {
    this.getHeaders = (_, headers) => ({
      'X-Token': this.token,
      ...headers,
    })

    return this
  }

  async setupWebhook(body: WebhookBody): Promise<Record<string, never>> {
    return await this.sign().fetch(endpoints.SETUP_WEBHOOK, {
      method: 'POST',
      body,
    })
  }
}

export class MonoCorporate extends MonoBase {
  private signer: Signer
  private keyId: string
  private requestId?: string

  constructor({ keyId, privateKey, baseURL = BASE_URL }: MonoCorporateOptions) {
    super({ baseURL })

    this.keyId = keyId
    this.signer = privateKey instanceof Signer ? privateKey : new Signer(privateKey)
  }

  protected auth(opts?: { keyId?: boolean, requestId?: boolean }) {
    const time = getTime()

    this.getHeaders = (endpoint, headers) => ({
      'X-Time': time,
      'X-Sign': this.signer.sign(time + endpoint),
      'X-Key-Id': this.keyId,
      ...(opts?.requestId ? { 'X-Request-Id': this.requestId } : null),
      ...headers,
    })

    return this
  }

  protected sign() {
    const time = getTime()

    this.getHeaders = (endpoint, headers) => {
      if (!this.requestId)
        throw new Error('Request ID is required. Run "getAccessRequest" first or use "setRequestId" method.')

      return {
        'X-Key-Id': this.keyId,
        'X-Time': time,
        'X-Sign': this.signer.sign(time + this.requestId + endpoint),
        'X-Request-Id': this.requestId,
        ...headers,
      }
    }

    return this
  }

  /**
   * Set the request ID to be used in the next request
   */
  public setRequestId(requestId: string) {
    this.requestId = requestId

    return this
  }

  /**
   * Creating a request for access to client data.
   */
  async getAccessRequest(opts?: { callback: string }): Promise<AccessResponse> {
    const res = await this.auth().fetch<any>(endpoints.AUTH_REQUEST, {
      method: 'POST',
      headers: {
        ...(opts?.callback ? { 'X-Callback': opts.callback } : null),
      },
    })

    this.requestId = res.tokenRequestId

    return res
  }

  /**
   * Checking the status of the request for access to client data.
   */
  async checkAccessRequest(): Promise<Record<string, never>> {
    return await this.sign().fetch(endpoints.AUTH_REQUEST)
  }

  /**
   * Obtaining information about the company.
   */
  async getCompanyInfo(): Promise<CompanyInfo> {
    return await this.auth({ requestId: true }).fetch(endpoints.CORP_SETTINGS)
  }

  async setupWebhook(body: WebhookBody): Promise<Record<string, never>> {
    return await this.auth({ requestId: true }).fetch(endpoints.SETUP_CORP_WEBHOOK, {
      method: 'POST',
      body,
    })
  }
}

export class MonoRegistrar extends ApiClient {
  private signer: Signer

  constructor({ privateKey, baseURL = BASE_URL }: MonoRegistrarOptions) {
    super({ baseURL })

    this.signer = privateKey instanceof Signer ? privateKey : new Signer(privateKey)
  }

  protected auth() {
    const time = getTime()

    this.getHeaders = (endpoint, headers) => ({
      'X-Time': time,
      'X-Sign': this.signer.sign(time + endpoint),
      ...headers,
    })

    return this
  }

  /**
   * Creation of an application for authorization of the company by the bank.
   */
  async register(body: RegistrationBody): Promise<Registration> {
    return await this.auth().fetch(endpoints.AUTH_REGISTRATION, {
      method: 'POST',
      body,
    })
  }

  /**
   * Obtaining the status of the application for authorization of the company by the bank.
   */
  async status(body: RegistrationStatusBody): Promise<RegistrationStatus> {
    return await this.auth().fetch(endpoints.AUTH_REGISTRATION_STATUS, {
      method: 'POST',
      body,
    })
  }
}

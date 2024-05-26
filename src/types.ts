import type { Signer } from './signer'

export interface ApiClientOptions extends Omit<RequestInit, 'body'> {
  baseURL?: string
  params?: Record<string, string | number | undefined>
  getHeaders?: (endpoint: string, headers: HeadersInit) => HeadersInit | Promise<HeadersInit>
  body?: Record<string, any>
}

export interface MonoBaseOptions {
  /**
   * Base URL for the API
   * @default 'https://api.monobank.ua/'
   */
  baseURL?: string
}

export interface MonoOptions extends MonoBaseOptions {
  /**
   * Token for personal access to the API
   * @example 'uYZ4-LWZRDOZAg10oCm1FCHKl27pncFyp092cMs18Hg0'
   * @see {@link https://api.monobank.ua/}
   */
  token: string
}

export interface MonoCorporateOptions extends MonoBaseOptions {
  /**
   * ID of the service key
   * @example '28a75537175a018645e6f8b14be7681791e701e0'
   */
  keyId: string
  /**
   * Private key for signing requests
   */
  privateKey: string | URL | Signer
}

export interface MonoRegistrarOptions extends MonoBaseOptions {
  /**
   * Private key for signing requests
   */
  privateKey: string | URL | Signer
}

export interface Currency {
  /**
   * Account currency code according to ISO 4217
   */
  currencyCodeA: number
  /**
   * Account currency code according to ISO 4217
   */
  currencyCodeB: number
  /**
   * Currency rate time in seconds in Unix time format
   */
  date: number
  rateBuy: number
  rateSell: number
  rateCross: number
}

export interface Account {
  id: string
  sendId: string
  balance: number
  creditLimit: number
  type: string
  currencyCode: number
  cashbackType: string
  maskedPan: string[]
  iban: string
}

export interface Jar {
  id: string
  sendId: string
  title: string
  description: string
  currencyCode: number
  balance: number
  goal: number
}

export interface ClientInfo {
  /**
   * Client ID (matches the id for send.monobank.ua)
   */
  clientId: string
  /**
   * Client name
   */
  name: string
  /**
   * URL for sending account balance change events
   */
  webHookUrl: string
  /**
   * List of rights that the service provides (1 letter for 1 permission)
   */
  permissions: string
  /**
   * List of available accounts
   */
  accounts: Account[]
  /**
   * List of available jars
   */
  jars: Jar[]
}

export interface Statement {
  /**
   * Unique transaction id
   */
  id: string
  /**
   * Transaction time in seconds in Unix time format
   */
  time: number
  /**
   * Description of transactions
   */
  description: string
  /**
   * Transaction type code (Merchant Category Code), according to ISO 18245
   */
  mcc: number
  /**
   * Original transaction type code (Merchant Category Code), according to ISO 18245
   */
  originalMcc: number
  /**
   * Amount blocking status (see [wiki]{@link https://en.wikipedia.org/wiki/Authorization_hold} for details)
   */
  hold: boolean
  /**
   * Amount in account currency in minimum currency units (kopecks, cents)
   */
  amount: number
  /**
   * Amount in transaction currency in minimum currency units (kopecks, cents)
   */
  operationAmount: number
  /**
   * Account currency code according to ISO 4217
   */
  currencyCode: number
  /**
   * The size of the commission in minimum currency units (kopecks, cents)
   */
  commissionRate: number
  /**
   * Amount of cashback in minimum currency units (kopecks, cents)
   */
  cashbackAmount: number
  /**
   * Account balance in minimum currency units (kopecks, cents)
   */
  balance: number
  /**
   * Comment on the transfer entered by the user. If not specified, the field will be absent
   */
  comment: string
  /**
   * Receipt number for check.gov.ua. The field may be missing
   */
  receiptId: string
  /**
   * The FOP receipt number comes in the event that it is a transaction with the transfer of funds
   */
  invoiceId: string
  /**
   * EDRPOU of the counterparty, present only for elements of the statement of accounts of the FOP
   */
  counterEdrpou: string
  /**
   * IBAN of the counterparty, present only for elements of the statement of accounts of the FOP
   */
  counterIban: string
  /**
   * Name of the counterparty
   */
  counterName: string
}

export interface CompanyInfo {
  /**
   * PEM file with secp256k1 public key in base64 format
   */
  pubkey: string
  /**
   * The company name
   */
  name: string
  /**
   * List of rights that the service provides (1 letter for 1 permission)
   */
  permissions: string
  /**
   * File with the image of the company logo in base64 format
   */
  logo: string
  /**
   * Address for CallBack (POST) – transaction data will be sent to this address
   */
  webHook?: string
}

export interface AccessResponse {
  /**
   * Access Token ID
   */
  tokenRequestId: string
  /**
   * The URL that needs to be displayed to the client as a QR code
   * or redirected to the page if the client uses a smartphone/tablet
   */
  acceptUrl: string
}

export interface Registration {
  /**
   * Application receipt status
   */
  status: string
}

export interface RegistrationStatus {
  /**
   * Application status (New | Declined | Approved)
   */
  status: string
  /**
   * ID of the service key
   */
  keyId: string
}

export interface AccountStatementParams {
  /**
   * Account or bank identifier from the Statement list or 0 - default account
   */
  account: string
  /**
   * The start of the discharge time in seconds in Unix time format
   * @example '1546304461'
   */
  from: number
  /**
   * The last time of the statement in seconds in Unix time format (if not available, the current time will be used)
   * @example '1546304461'
   */
  to?: number
}

export interface RegistrationBody {
  /**
   * PEM file with secp256k1 public key in base64 format
   */
  pubkey: string
  /**
   * The company name
   */
  name: string
  /**
   * Description of the company's services and the purpose of using the api
   */
  description: string
  /**
   * The contact person
   */
  contactPerson: string
  /**
   * The contact phone number
   */
  phone: string
  /**
   * The contact email
   */
  email: string
  /**
   * File with the image of the company logo in base64 format
   */
  logo: string
}

export interface RegistrationStatusBody {
  /**
   * PEM file with secp256k1 public key in base64 format
   */
  pubkey: string
}

export interface WebhookBody {
  /**
   * Address for CallBack (POST) – transaction data will be sent to this address.
   * When calling the api, a test POST request will be made to this address.
   * If it is not answered with 200 OK, the api call will end with an error.
   */
  webHookUrl: string
}

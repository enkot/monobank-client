---
outline: deep
---

# MonoBase
An abstract class for the common methods of the [Monobank API](https://api.monobank.ua/docs/index.html)
and [Corporate Monobank API](https://api.monobank.ua/docs/corporate.html).

## Types

```ts
interface MonoBaseOptions {
  /**
   * Base URL for the API
   * @default 'https://api.monobank.ua/'
   */
  baseURL?: string
}

declare abstract class MonoBase extends ApiClient {
  /**
   * Get a basic list of monobank currency rates. Information is cached and updated no more than once every 5 minutes.
   */
  static getCurrencyList(): Promise<Currency[]>
  /**
   * Get a basic list of monobank currency rates. Information is cached and updated no more than once every 5 minutes.
   */
  getCurrencyList(): Promise<Currency[]>
  /**
   * Obtaining information about the client and a list of his accounts
   */
  getClientInfo(): Promise<ClientInfo>
  /**
   * Obtaining information about the client and a list of his accounts
   */
  getAccountStatement(params: AccountStatementParams): Promise<Statement[]>
  /**
   * Setting up a webhook to receive updates on customer payments
   * - To confirm the correctness of the provided address, a GET request is sent to it. The server must respond strictly with the HTTP status code 200, and nothing else. If the validation is successful, POST requests with events begin to be sent to the given address.
   * - Events are sent in the following form: POST request to the given address in the format {type:"StatementItem", data:{account:"...", statementItem:{#StatementItem}}}. If the user service does not respond to the command within 5 seconds, the service will try again after another 60 and 600 seconds. If no response is received on the third attempt, the function will be disabled. The server response must strictly contain HTTP status code 200.
   */
  abstract setupWebhook(body: WebhookBody): Promise<Record<string, never>>
}
```

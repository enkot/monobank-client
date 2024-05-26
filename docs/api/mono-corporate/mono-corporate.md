---
outline: deep
---

# MonoCorporate

A client for the [Corporate Monobank API](https://api.monobank.ua/docs/corporate.html). Extends the [MonoBase](../mono-base.md) class and has additional methods for working with corporate accounts.

```ts twoslash
import { MonoCorporate } from 'monobank-client'

const mono = new MonoCorporate({
  keyId: 'your_key_id',
  privateKey: new URL('./priv.key', import.meta.url),
})
```

## Types

```ts
interface MonoCorporateOptions extends MonoBaseOptions {
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

declare class MonoCorporate extends MonoBase {
  constructor({ keyId, privateKey, baseURL }: MonoCorporateOptions)
  /**
   * Set the request ID to be used in the next request
   */
  setRequestId(requestId: string): this
  /**
   * Creating a request for access to client data.
   */
  getAccessRequest(opts?: {
    callback: string
  }): Promise<AccessResponse>
  /**
   * Checking the status of the request for access to client data.
   */
  checkAccessRequest(): Promise<Record<string, never>>
  /**
   * Obtaining information about the company.
   */
  getCompanyInfo(): Promise<CompanyInfo>
  setupWebhook(body: WebhookBody): Promise<Record<string, never>>
}
```

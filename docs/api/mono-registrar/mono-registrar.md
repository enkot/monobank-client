---
outline: deep
---

# MonoRegistrar

A client for the [Corporate Monobank API](https://api.monobank.ua/docs/corporate.html) to create an authorization request, as well as provide information about the service.

```ts twoslash
import { MonoRegistrar } from 'monobank-client'

const mono = new MonoRegistrar({
  privateKey: new URL('./priv.key', import.meta.url),
})
```

## Types

```ts
interface MonoRegistrarOptions extends MonoBaseOptions {
  /**
   * Private key for signing requests
   */
  privateKey: string | URL | Signer
}

declare class MonoRegistrar extends ApiClient {
  constructor({ privateKey, baseURL }: MonoRegistrarOptions)
  /**
   * Creation of an application for authorization of the company by the bank.
   */
  register(body: RegistrationBody): Promise<Registration>
  /**
   * Obtaining the status of the application for authorization of the company by the bank.
   */
  status(body: RegistrationStatusBody): Promise<RegistrationStatus>
}
```

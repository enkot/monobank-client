# status

Creation of an application for authorization of the company by the bank.

```ts twoslash
import { MonoRegistrar } from 'monobank-client'

const mono = new MonoRegistrar({
  privateKey: new URL('./priv.key', import.meta.url),
})
// ---cut-before---
const res = await mono.status({
  pubkey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZZd0VBWUhLb1pJemow...'
})
```

## Types
```ts
declare function status(body: RegistrationStatusBody): Promise<RegistrationStatus>

interface RegistrationStatusBody {
  /**
   * PEM file with secp256k1 public key in base64 format
   */
  pubkey: string
}

interface RegistrationStatus {
  /**
   * Application status (New | Declined | Approved)
   */
  status: string
  /**
   * ID of the service key
   */
  keyId: string
}
```

## Response example
```json
{
  "status": "Approved",
  "keyId": "string"
}
```

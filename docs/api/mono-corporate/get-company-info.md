# getCompanyInfo

Information about the company.

```ts twoslash
import { createMonoCorporate } from 'monobank-client'

const mono = createMonoCorporate({
  keyId: 'your_key_id',
  privateKey: new URL('./priv.key', import.meta.url),
})
// ---cut-before---
const res = await mono.getCompanyInfo()
```

## Types
```ts
declare function getCompanyInfo(): Promise<CompanyInfo>

interface CompanyInfo {
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
```

## Response example
```json
{
  "pubkey": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZZd0VBWUhLb1pJemow...",
  "name": "Компанія",
  "permission": "psf",
  "logo": "iVBORw0KGgoAAAANSUhEUgAAAUAAAACECAYAAADhnvK8AAAapElEQVR42...",
  "webhook": "https://example.com/mono/corp/webhook/maybesomegibberishuniquestringbutnotnecessarily"
}
```

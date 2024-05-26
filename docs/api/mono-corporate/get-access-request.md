# getAccessRequest

Creating a request for access to client data.

```ts twoslash
import { createMonoCorporate } from 'monobank-client'

const mono = createMonoCorporate({
  keyId: 'your_key_id',
  privateKey: new URL('./priv.key', import.meta.url),
})
// ---cut-before---
const res = await mono.getAccessRequest()
```

## Types
```ts
declare function getAccessRequest(opts?: {
  callback: string
}): Promise<AccessResponse>

interface AccessResponse {
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
```

## Response example
```json
{
  "tokenRequestId": "uLkwh3NzFAfEkj7urj5C7AU_",
  "acceptUrl": "https://mbnk.app/auth/uLkwh3NzFAfEkj7urj5C7AU_"
}
```

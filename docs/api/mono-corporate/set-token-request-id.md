# setTokenRequestId

Sets the request ID to be used in the next requests.

```ts twoslash
import { createMonoCorporate } from 'monobank-client'

const mono = createMonoCorporate({
  keyId: 'your_key_id',
  privateKey: new URL('./priv.key', import.meta.url),
})
// ---cut-before---
await mono.setTokenRequestId('your_request_id')
```

## Types
```ts
declare function setTokenRequestId(): this
```

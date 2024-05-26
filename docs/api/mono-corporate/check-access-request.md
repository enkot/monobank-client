# checkAccessRequest

Checking the status of the request for access to client data.

```ts twoslash
import { createMonoCorporate } from 'monobank-client'

const mono = createMonoCorporate({
  keyId: 'your_key_id',
  privateKey: new URL('./priv.key', import.meta.url),
})
// ---cut-before---
const res = await mono.checkAccessRequest()
```

## Types
```ts
declare function checkAccessRequest(): Promise<Record<string, never>>
```

## Response example
```json
{}
```

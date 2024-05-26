---
outline: deep
---

# Mono
A client for the [Monobank API](https://api.monobank.ua/docs/index.html). Extends the [MonoBase](../mono-base.md) class.

```ts twoslash
import { Mono } from 'monobank-client'

const mono = new Mono({
  token: 'your_token'
})
```

## Types

```ts
interface MonoOptions extends MonoBaseOptions {
  /**
   * Token for personal access to the API
   * @example 'uYZ4-LWZRDOZAg10oCm1FCHKl27pncFyp092cMs18Hg0'
   * @see {@link https://api.monobank.ua/}
   */
  token: string
}

declare class Mono extends MonoBase {
  constructor({ token, baseURL }: MonoOptions)
  setupWebhook(body: WebhookBody): Promise<Record<string, never>>
}
```

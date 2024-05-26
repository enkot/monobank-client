# setupWebhook

Setting up a webhook to receive updates on customer payments

```ts twoslash
import { createMono } from 'monobank-client'

const mono = createMono({
  token: 'your_token'
})
// ---cut-before---
await mono.setupWebhook({
  webHookUrl: 'https://your_webhook_url'
})
```

::: info
- To confirm the correctness of the provided address, a GET request is sent to it. The server must respond strictly with the HTTP status code 200, and nothing else. If the validation is successful, POST requests with events begin to be sent to the given address.
- Events are sent in the following form: POST request to the given address in the format `{type:"StatementItem", data:{account:"...", statementItem:{#StatementItem}}}`. If the user service does not respond to the command within 5 seconds, the service will try again after another 60 and 600 seconds. If no response is received on the third attempt, the function will be disabled. The server response must strictly contain HTTP status code 200.
:::

## Types
```ts
declare function setupWebhook(body: WebhookBody): Promise<Record<string, never>>

interface WebhookBody {
  /**
   * Address for CallBack (POST) – transaction data will be sent to this address.
   * When calling the api, a test POST request will be made to this address.
   * If it is not answered with 200 OK, the api call will end with an error.
   */
  webHookUrl: string
}
```

## Response example
```json
{}
```

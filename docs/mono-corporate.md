---
outline: deep
---

# Mono Corporate

The `MonoCorporate` class provides a convenient wrapper around the [Monobank API](https://api.monobank.ua/docs/corporate.html).

You can use the `createMono` function which is a factory function that creates and returns an instance of the `Mono` class.
```ts twoslash
import { createMonoCorporate } from 'monobank-client'

const mono = createMonoCorporate({
  keyId: 'your_key_id',
  privateKey: new URL('./priv.key', import.meta.url),
  baseURL: 'https://api.monobank.ua/',
})

// or
//
// import { MonoCorporate } from 'monobank-client'
//
// const mono = new MonoCorporate({ ... })
```
::: warning
Access to client personal data is provided only to companies authorized by the bank. To get access, you need to create an authorization request, as well as provide information about the service.
:::

## getCurrencyList

Obtaining information about the client and a list of his accounts

```ts twoslash
import { createMono } from 'monobank-client'

const mono = createMono({
  token: 'your_token'
})
// ---cut-before---
const res = await mono.getCurrencyList()
const {
  currencyCodeA,
  currencyCodeB,
  date,
  rateSell,
  rateCross,
} = res[0]
```
it also exists as a static method on the `Mono` class
```ts twoslash
import { Mono } from 'monobank-client'
// ---cut-before---
const res = await Mono.getCurrencyList()
```
::: details Response example
```json
[
  {
    "currencyCodeA": 840,
    "currencyCodeB": 980,
    "date": 1628586000,
    "rateSell": 27.5,
    "rateCross": 27.5
  }
]
```
:::

## getClientInfo

Obtaining information about the client and a list of his accounts

```ts twoslash
import { createMono } from 'monobank-client'

const mono = createMono({
  token: 'your_token'
})
// ---cut-before---
const data = await mono.getClientInfo()
const {
  clientId,
  name,
  webHookUrl,
  permissions,
  accounts,
  jars,
} = data
```
::: details Response example
```json
{
  "clientId": "3MSaMMtczs",
  "name": "Мазепа Іван",
  "webHookUrl": "https://example.com/some_random_data_for_security",
  "permissions": "psfj",
  "accounts": [
    {
      "id": "kKGVoZuHWzqVoZuH",
      "sendId": "uHWzqVoZuH",
      "balance": 10000000,
      "creditLimit": 10000000,
      "type": "black",
      "currencyCode": 980,
      "cashbackType": "UAH",
      "maskedPan": [
        "537541******1234"
      ],
      "iban": "UA733220010000026201234567890"
    }
  ],
  "jars": [
    {
      "id": "kKGVoZuHWzqVoZuH",
      "sendId": "uHWzqVoZuH",
      "title": "На тепловізор",
      "description": "На тепловізор",
      "currencyCode": 980,
      "balance": 1000000,
      "goal": 10000000
    }
  ]
}
```
:::

## setupWebhook

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
::: details Response example
```json
{}
```
:::
::: info
- To confirm the correctness of the provided address, a GET request is sent to it. The server must respond strictly with the HTTP status code 200, and nothing else. If the validation is successful, POST requests with events begin to be sent to the given address.
- Events are sent in the following form: POST request to the given address in the format `{type:"StatementItem", data:{account:"...", statementItem:{#StatementItem}}}`. If the user service does not respond to the command within 5 seconds, the service will try again after another 60 and 600 seconds. If no response is received on the third attempt, the function will be disabled. The server response must strictly contain HTTP status code 200.
:::

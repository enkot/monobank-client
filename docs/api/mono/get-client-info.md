# getClientInfo

Obtaining information about the client and a list of his accounts

```ts twoslash
import { createMono } from 'monobank-client'

const mono = createMono({
  token: 'your_token'
})
// ---cut-before---
const res = await mono.getClientInfo()
```

## Types
```ts
declare function getClientInfo(): Promise<ClientInfo>

interface ClientInfo {
  /**
   * Client ID (matches the id for send.monobank.ua)
   */
  clientId: string
  /**
   * Client name
   */
  name: string
  /**
   * URL for sending account balance change events
   */
  webHookUrl: string
  /**
   * List of rights that the service provides (1 letter for 1 permission)
   */
  permissions: string
  /**
   * List of available accounts
   */
  accounts: Account[]
  /**
   * List of available jars
   */
  jars: Jar[]
}

interface Account {
  id: string
  sendId: string
  balance: number
  creditLimit: number
  type: string
  currencyCode: number
  cashbackType: string
  maskedPan: string[]
  iban: string
}

interface Jar {
  id: string
  sendId: string
  title: string
  description: string
  currencyCode: number
  balance: number
  goal: number
}
```

## Response example
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

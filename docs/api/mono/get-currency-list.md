# getCurrencyList

Obtaining information about the client and a list of his accounts

```ts twoslash
import { createMono } from 'monobank-client'

const mono = createMono({
  token: 'your_token'
})
// ---cut-before---
const res = await mono.getCurrencyList()
```
it also exists as a static method on the `Mono` class
```ts twoslash
import { Mono } from 'monobank-client'
// ---cut-before---
const res = await Mono.getCurrencyList()
```

## Types
```ts
declare function getCurrencyList(): Promise<Currency[]>

interface Currency {
  /**
   * Account currency code according to ISO 4217
   */
  currencyCodeA: number
  /**
   * Account currency code according to ISO 4217
   */
  currencyCodeB: number
  /**
   * Currency rate time in seconds in Unix time format
   */
  date: number
  rateBuy: number
  rateSell: number
  rateCross: number
}
```

## Response example
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

# getAccountStatement

Get a statement for the time from `from` to `to` time in seconds in Unix time format. The maximum time for which it is possible to receive a statement is 31 days + 1 hour (2682000 seconds).

```ts twoslash
import { createMono } from 'monobank-client'

const mono = createMono({
  token: 'your_token'
})
// ---cut-before---
const res = await mono.getAccountStatement({ account: '0', from: 1546304461 })
```

::: warning
The limit for using the function is no more than 1 time per 60 seconds.

Returns 500 transactions from the end, that is, from time to to time from. If the number of transactions = 500, you need to make another request, reducing the time to to the time of the last payment, from the response. If again the number of transactions = 500, then execute requests until the number of transactions is < 500. Accordingly, if the number of transactions is < 500, then all payments for the specified period have already been received.
:::

## Types
```ts
declare function getAccountStatement(params: AccountStatementParams): Promise<Statement[]>

interface AccountStatementParams {
  /**
   * Account or bank identifier from the Statement list or 0 - default account
   */
  account: string
  /**
   * The start of the discharge time in seconds in Unix time format
   * @example '1546304461'
   */
  from: number
  /**
   * The last time of the statement in seconds in Unix time format (if not available, the current time will be used)
   * @example '1546304461'
   */
  to?: number
}

interface Statement {
  /**
   * Unique transaction id
   */
  id: string
  /**
   * Transaction time in seconds in Unix time format
   */
  time: number
  /**
   * Description of transactions
   */
  description: string
  /**
   * Transaction type code (Merchant Category Code), according to ISO 18245
   */
  mcc: number
  /**
   * Original transaction type code (Merchant Category Code), according to ISO 18245
   */
  originalMcc: number
  /**
   * Amount blocking status (see [wiki]{@link https://en.wikipedia.org/wiki/Authorization_hold} for details)
   */
  hold: boolean
  /**
   * Amount in account currency in minimum currency units (kopecks, cents)
   */
  amount: number
  /**
   * Amount in transaction currency in minimum currency units (kopecks, cents)
   */
  operationAmount: number
  /**
   * Account currency code according to ISO 4217
   */
  currencyCode: number
  /**
   * The size of the commission in minimum currency units (kopecks, cents)
   */
  commissionRate: number
  /**
   * Amount of cashback in minimum currency units (kopecks, cents)
   */
  cashbackAmount: number
  /**
   * Account balance in minimum currency units (kopecks, cents)
   */
  balance: number
  /**
   * Comment on the transfer entered by the user. If not specified, the field will be absent
   */
  comment: string
  /**
   * Receipt number for check.gov.ua. The field may be missing
   */
  receiptId: string
  /**
   * The FOP receipt number comes in the event that it is a transaction with the transfer of funds
   */
  invoiceId: string
  /**
   * EDRPOU of the counterparty, present only for elements of the statement of accounts of the FOP
   */
  counterEdrpou: string
  /**
   * IBAN of the counterparty, present only for elements of the statement of accounts of the FOP
   */
  counterIban: string
  /**
   * Name of the counterparty
   */
  counterName: string
}
```

## Response example
```json
[
  {
    "id": "ZuHWzqkKGVo=",
    "time": 1554466347,
    "description": "Покупка щастя",
    "mcc": 7997,
    "originalMcc": 7997,
    "hold": false,
    "amount": -95000,
    "operationAmount": -95000,
    "currencyCode": 980,
    "commissionRate": 0,
    "cashbackAmount": 19000,
    "balance": 10050000,
    "comment": "За каву",
    "receiptId": "XXXX-XXXX-XXXX-XXXX",
    "invoiceId": "2103.в.27",
    "counterEdrpou": "3096889974",
    "counterIban": "UA898999980000355639201001404",
    "counterName": "ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ВОРОНА»"
  }
]
```

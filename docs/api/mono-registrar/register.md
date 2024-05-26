# register

Creation of an application for authorization of the company by the bank.

```ts twoslash
import { MonoRegistrar } from 'monobank-client'

const mono = new MonoRegistrar({
  privateKey: new URL('./priv.key', import.meta.url),
})
// ---cut-before---
const res = await mono.register({
  pubkey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZZd0VBWUhLb1pJemow...',
  name: 'ТОВ "Ворона"',
  description: 'Ми робимо найрозумніший PFM з усіх можливих і нам потрібен доступ до виписка користувача, щоб створювати красиву статистику',
  contactPerson: 'Роман Шевченко',
  phone: '380671234567',
  email: 'etс@example.com',
  logo: 'iVBORw0KGgoAAAANSUhEUgAAAUAAAACECAYAAADhnvK8AAAapElEQVR42...'
})
```

## Types
```ts
declare function register(body: RegistrationBody): Promise<Registration>

interface RegistrationBody {
  /**
   * PEM file with secp256k1 public key in base64 format
   */
  pubkey: string
  /**
   * The company name
   */
  name: string
  /**
   * Description of the company's services and the purpose of using the api
   */
  description: string
  /**
   * The contact person
   */
  contactPerson: string
  /**
   * The contact phone number
   */
  phone: string
  /**
   * The contact email
   */
  email: string
  /**
   * File with the image of the company logo in base64 format
   */
  logo: string
}

interface Registration {
  /**
   * Application receipt status
   */
  status: string
}
```

## Response example
```json
{
  "status": "New"
}
```

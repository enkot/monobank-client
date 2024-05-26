import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { Mono, MonoCorporate } from '../src'

vi.mock('../src/utils.js', async () => ({
  getTime: () => '1713964784',
}))

vi.mock('../src/Signer.js', async () => ({
  Signer: class {
    sign() {
      return 'MEQCIBDMtzATv071zeKyNUppxTPzYtHRvoYOY5LGnwgQNMd5AiBRv1/2GRxhJtqmuSQvUO7yPbCiDBc2YmXQW64MGC4R2g=='
    }
  },
}))

const server = setupServer(
  http.all(`*`, async ({ request }) => {
    const headers = {}
    const body = await request.json().catch(() => null)

    for (const pair of request.headers.entries())
      headers[pair[0]] = pair[1]

    return new HttpResponse(JSON.stringify({
      method: request.method,
      url: request.url,
      headers,
      body,
    }))
  }),
)
server.listen()

describe('monobank-client', () => {
  describe('mono', () => {
    let mono: Mono

    beforeAll(() => {
      mono = new Mono({ token: 'test' })
    })

    it('getClientInfo', async () => {
      const res = await mono.getClientInfo()

      expect(res).toMatchInlineSnapshot(`
        {
          "body": null,
          "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "x-token": "test",
          },
          "method": "GET",
          "url": "https://api.monobank.ua/personal/client-info",
        }
      `)
    })
  })

  describe('mono corporate', () => {
    let mono: MonoCorporate

    beforeAll(() => {
      mono = new MonoCorporate({ keyId: 'foo', privateKey: '' })
    })

    beforeEach(() => {
      mono.setRequestId('ahS4iKlpn5GlZWFQOzPS3hw')
    })

    it('getAccessRequest', async () => {
      const res = await mono.getAccessRequest()

      expect(res).toMatchInlineSnapshot(`
        {
          "body": null,
          "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "x-key-id": "foo",
            "x-sign": "MEQCIBDMtzATv071zeKyNUppxTPzYtHRvoYOY5LGnwgQNMd5AiBRv1/2GRxhJtqmuSQvUO7yPbCiDBc2YmXQW64MGC4R2g==",
            "x-time": "1713964784",
          },
          "method": "POST",
          "url": "https://api.monobank.ua/personal/auth/request",
        }
      `)
    })

    it('getClientInfo', async () => {
      const res = await mono.getClientInfo()

      expect(res).toMatchInlineSnapshot(`
        {
          "body": null,
          "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "x-key-id": "foo",
            "x-request-id": "ahS4iKlpn5GlZWFQOzPS3hw",
            "x-sign": "MEQCIBDMtzATv071zeKyNUppxTPzYtHRvoYOY5LGnwgQNMd5AiBRv1/2GRxhJtqmuSQvUO7yPbCiDBc2YmXQW64MGC4R2g==",
            "x-time": "1713964784",
          },
          "method": "GET",
          "url": "https://api.monobank.ua/personal/client-info",
        }
      `)
    })

    it('getAccountStatement', async () => {
      const res = await mono.getAccountStatement({ account: '0', from: 1712451640 })

      expect(res).toMatchInlineSnapshot(`
        {
          "body": null,
          "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "x-key-id": "foo",
            "x-request-id": "ahS4iKlpn5GlZWFQOzPS3hw",
            "x-sign": "MEQCIBDMtzATv071zeKyNUppxTPzYtHRvoYOY5LGnwgQNMd5AiBRv1/2GRxhJtqmuSQvUO7yPbCiDBc2YmXQW64MGC4R2g==",
            "x-time": "1713964784",
          },
          "method": "GET",
          "url": "https://api.monobank.ua/personal/statement/0/1712451640",
        }
      `)
    })

    it('setupWebhook', async () => {
      const res = await mono.setupWebhook({ webHookUrl: 'https://google.com' })

      expect(res).toMatchInlineSnapshot(`
        {
          "body": {
            "webHookUrl": "https://google.com",
          },
          "headers": {
            "accept": "application/json",
            "content-type": "application/json",
            "x-key-id": "foo",
            "x-request-id": "ahS4iKlpn5GlZWFQOzPS3hw",
            "x-sign": "MEQCIBDMtzATv071zeKyNUppxTPzYtHRvoYOY5LGnwgQNMd5AiBRv1/2GRxhJtqmuSQvUO7yPbCiDBc2YmXQW64MGC4R2g==",
            "x-time": "1713964784",
          },
          "method": "POST",
          "url": "https://api.monobank.ua/personal/corp/webhook",
        }
      `)
    })
  })
})

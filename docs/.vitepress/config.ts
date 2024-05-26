import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Monobank Client',
  description: 'Monobank API client',
  markdown: {
    codeTransformers: [
      transformerTwoslash(),
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' },
    ],

    sidebar: {
      '/api': [
        { text: 'MonoBase', link: '/api/mono-base' },
        {
          text: 'Mono',
          items: [
            { text: 'Mono', link: '/api/mono/mono' },
            { text: 'getCurrencyList', link: '/api/mono/get-currency-list' },
            { text: 'getClientInfo', link: '/api/mono/get-client-info' },
            { text: 'getAccountStatement', link: '/api/mono/get-account-statement' },
            { text: 'setupWebhook', link: '/api/mono/setup-webhook' },
          ],
        },
        {
          text: 'MonoCorporate',
          items: [
            { text: 'MonoCorporate', link: '/api/mono-corporate/mono-corporate' },
            { text: 'setTokenRequestId', link: '/api/mono-corporate/set-token-request-id' },
            { text: 'getAccessRequest', link: '/api/mono-corporate/get-access-request' },
            { text: 'checkAccessRequest', link: '/api/mono-corporate/check-access-request' },
            { text: 'getCompanyInfo', link: '/api/mono-corporate/get-company-info' },
          ],
        },
        {
          text: 'MonoRegistrar',
          items: [
            { text: 'MonoRegistrar', link: '/api/mono-registrar/mono-registrar' },
            { text: 'register', link: '/api/mono-registrar/register' },
            { text: 'status', link: '/api/mono-registrar/status' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})

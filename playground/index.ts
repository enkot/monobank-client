import { MonoCorporate } from '../src'
import { MonoError } from '../src/error'

(async function test() {
  const mono = new MonoCorporate({
    keyId: 'ad333a3c48b8d886be6411870ab5922ea48c38e9',
    privateKey: new URL('./priv.key', import.meta.url),
  })

  try {
    // await mono.getClientInfo()
    // const monoClient = createMonoClient({ baseURL: 'https://api.monobank.ua', token: 'uYZ4-LWZRDOZAg10oCm1FCHKl27pncFyp092cMs18Hg0' })
    mono.setRequestId('ax12fdeLIQcdpFwJ6L9jfhg')
    // console.log(await mono.getClientInfo())
    // console.log(await mono.getCompanyInfo())
    // console.log(await mono.setupWebhook({ webHookUrl: 'https://webhook-rflw34i5xa-uc.a.run.app' }))
    // console.log(await mono.getAccountStatement({ account: '0', from: 1715719966063 }))
  }
  catch (error) {
    if (error instanceof MonoError)
      console.error(error.message, error.status, error.statusText)
  }
})()

export default {
  CURRENCY_LIST: '/bank/currency' as const,
  CLIENT_INFO: '/personal/client-info' as const,
  ACCOUNT_STATEMENT: '/personal/statement/{account}/{from}/{to}' as const,
  CORP_SETTINGS: '/personal/corp/settings' as const,
  AUTH_REQUEST: '/personal/auth/request' as const,
  AUTH_REGISTRATION: '/personal/auth/registration' as const,
  AUTH_REGISTRATION_STATUS: '/personal/auth/registration/status' as const,
  SETUP_WEBHOOK: '/personal/webhook' as const,
  SETUP_CORP_WEBHOOK: '/personal/corp/webhook' as const,
}

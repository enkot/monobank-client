export class MonoError extends Error {
  data?: any
  status?: number
  statusText?: string

  constructor(message: string, opts?: { status?: number, statusText?: string, data?: any }) {
    super(message)
    this.name = 'MonoError'

    for (const key of ['data', 'status', 'statusText'] as const) {
      Object.defineProperty(this, key, {
        get() {
          return opts?.[key]
        },
      })
    }
  }
}

export class SignerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SignerError'
  }
}

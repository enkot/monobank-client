import type { ApiClientOptions } from './types'
import { MonoError } from './error'

export class ApiClient {
  protected getHeaders?: (endpoint: string, headers: HeadersInit) => HeadersInit

  constructor(private globalOptions: ApiClientOptions) {}

  public async fetch<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    const headers = {
      ...this.getHeaders?.(endpoint, options?.headers || {}),
      ...options?.headers,
    }

    this.getHeaders = undefined

    return ApiClient.fetch(endpoint, {
      ...this.globalOptions,
      ...options,
      headers,
    })
  }

  static async fetch<T>(endpoint: string, options?: ApiClientOptions): Promise<T> {
    if (options?.params)
      endpoint = Object.entries(options.params).reduce((acc, [key, value]) => acc.replace(`/{${key}}`, value ? `/${value}` : ''), endpoint)

    const url = new URL(endpoint, options?.baseURL)
    const body = typeof options?.body === 'string'
      ? options?.body
      : JSON.stringify(options?.body)
    const headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
      ...options?.headers,
    }

    const response = await fetch(url, {
      ...options,
      body,
      headers,
    })
    const data = await response.json()

    if (response.status >= 400 && response.status < 600) {
      throw new MonoError(data?.errorDescription, {
        status: response.status,
        statusText: response.statusText,
        data,
      })
    }

    return data
  }
}

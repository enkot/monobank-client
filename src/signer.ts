import type { PathLike } from 'node:fs'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { Buffer } from 'node:buffer'
import { SignerError } from './error'

export class Signer {
  pkey: string | crypto.KeyObject

  constructor(privateKey: PathLike, options?: { keyHeaderPattern: string | RegExp }) {
    try {
      if (typeof privateKey === 'string' && privateKey.match(options?.keyHeaderPattern || /EC PRIVATE KEY/))
        this.pkey = privateKey
      else
        this.pkey = fs.readFileSync(privateKey, { encoding: 'utf8', flag: 'r' })
    }
    catch (error) {
      throw new SignerError(
        '"privateKey" must be valid ECDSA PEM string or valid path to readable PEM file',
      )
    }
  }

  sign(data: string | Buffer) {
    return crypto
      .createSign('sha256')
      .update(Buffer.isBuffer(data) ? data : Buffer.from(data))
      .sign(this.pkey, 'base64')
  }
}

# Monobank Client

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/monobank-client?color=yellow)](https://npmjs.com/package/monobank-client)
[![npm downloads](https://img.shields.io/npm/dm/monobank-client?color=yellow)](https://npmjs.com/package/monobank-client)

<!-- /automd -->

Monobank API client for Node.js and browsers.
This package provides a simple way to interact with Monobank API. It supports both personal and corporate API.

## Usage

Install package:

<!-- automd:pm-install -->

```sh
# ✨ Auto-detect
npx nypm install monobank-client

# npm
npm install monobank-client

# yarn
yarn add monobank-client

# pnpm
pnpm install monobank-client

# bun
bun install monobank-client
```

<!-- /automd -->

Import:

<!-- automd:jsimport cjs cdn name="monobank-client" -->

**ESM** (Node.js, Bun)

```js
import { Mono, MonoCorporate, MonoRegistrar } from 'monobank-client'
```

**CommonJS** (Legacy Node.js)

```js
const { Mono, MonoCorporate, MonoRegistrar } = require('monobank-client')
```

**CDN** (Deno, Bun and Browsers)

```js
import { Mono, MonoCorporate, MonoRegistrar } from 'https://esm.sh/monobank-client'
```

<!-- /automd -->

## Mono

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/enkot/monobank-client/blob/main/LICENSE) license.
Made by [community](https://github.com/enkot/monobank-client/graphs/contributors) 💛
<br><br>
<a href="https://github.com/enkot/monobank-client/graphs/contributors">
<img src="https://contrib.rocks/image?repo=enkot/monobank-client" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->

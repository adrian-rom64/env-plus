# env-plus

## Getting started

Run your favourite package manager

```bash
npm install env-plus
# yarn add env-plus
# pnpm install env-plus
```

Make sure you have these properties in typescript config

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"strictPropertyInitialization": false
```

Create .env file with example variables

```bash
MESSAGE="hello there"
PORT="3000"
LOGGER="true"
```

Create your first env schema

```typescript
import * as dotenv from 'dotenv'
dotenv.config()

import { EnvSchema, EnvProperty, EnvManager } from 'env-plus'

@EnvSchema()
export class MyEnvSchema {
  @EnvProperty('MESSAGE')
  message: string

  @EnvProperty('PORT')
  port: number

  @EnvProperty('LOGGER')
  logger: boolean
}

const env = EnvManager.getPlainInstance(MyEnvSchema)

console.log(env)
```

Returns an object with parsed values

```typescript
{
  message: 'hello there',
  port: 3000,
  logger: true
}
```

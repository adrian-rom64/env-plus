import { EnvNested } from '../../src/EnvNested'
import { EnvSchema } from '../../src/EnvSchema'

@EnvSchema()
export class ClassNull {
  @EnvNested(() => null as any)
  empty: any
}

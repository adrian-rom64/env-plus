import { EnvNested } from '../../src/EnvNested'
import { EnvSchema } from '../../src/EnvSchema'
import { EnvProperty } from '../../src/EnvProperty'
import { Class3B } from './Class3B'

@EnvSchema()
export class Class2B {
  @EnvProperty('PROP2')
  prop2: string

  @EnvNested(() => Class3B)
  class3b: Class3B
}

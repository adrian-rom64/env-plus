import { EnvNested } from '../../src/EnvNested'
import { EnvSchema } from '../../src/EnvSchema'
import { EnvProperty } from '../../src/EnvProperty'
import { Class1B } from './Class1B'

@EnvSchema()
export class Class3B {
  @EnvProperty('PROP3')
  prop3: string

  @EnvNested(() => Class1B)
  class1b: Class1B
}

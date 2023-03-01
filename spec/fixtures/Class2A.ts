import { EnvNested } from '../../src/EnvNested'
import { EnvSchema } from '../../src/EnvSchema'
import { EnvProperty } from '../../src/EnvProperty'
import { Class1A } from './Class1A'

@EnvSchema()
export class Class2A {
  @EnvProperty('PROP2')
  prop2: string

  @EnvNested(() => Class1A)
  class1a: Class1A
}

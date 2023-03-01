import { EnvNested } from '../../src/EnvNested'
import { EnvSchema } from '../../src/EnvSchema'
import { EnvProperty } from '../../src/EnvProperty'
import { Class2B } from './Class2B'

@EnvSchema()
export class Class1B {
  @EnvProperty('PROP1')
  prop1: string

  @EnvNested(() => Class2B)
  class2b: Class2B
}

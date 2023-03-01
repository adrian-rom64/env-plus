import { EnvNested } from '../../src/EnvNested'
import { EnvSchema } from '../../src/EnvSchema'
import { EnvProperty } from '../../src/EnvProperty'
import { Class2A } from './Class2A'

@EnvSchema()
export class Class1A {
  @EnvProperty('PROP1')
  prop1: string

  @EnvNested(() => Class2A)
  class2a: Class2A
}

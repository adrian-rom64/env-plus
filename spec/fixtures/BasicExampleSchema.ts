import { EnvSchema } from '../../src/EnvSchema'
import { EnvProperty } from '../../src/EnvProperty'

@EnvSchema()
export class BasicExampleSchema {
  @EnvProperty('STR', {
    description: 'Lorem ipsum i guess',
    example: 'string',
    default: 'string'
  })
  str: string

  @EnvProperty('BOOL', {
    description: 'true or not true',
    example: 'true',
    default: 'false'
  })
  bool: boolean

  @EnvProperty('NUM', {
    description: 'Awesome number of 42',
    example: '42.1',
    default: '0'
  })
  num: number

  @EnvProperty('BN', {
    description: 'Biiiiiig number',
    required: false,
    example: '1000'
  })
  bn: bigint

  @EnvProperty('SYM', {
    description: 'i dont know what that does'
  })
  sym: symbol

  @EnvProperty('EMPTY')
  empty: string
}

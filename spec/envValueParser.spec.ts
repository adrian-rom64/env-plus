import { EnvParserException } from '../src/EnvExceptions'
import { EnvValueParser } from '../src/EnvValueParser'

describe('EnvValueParser', () => {
  const parser = new EnvValueParser()

  const cases = [
    {
      value: 'hello',
      type: 'String',
      expected: 'hello',
      expectedError: null
    },
    {
      value: '',
      type: 'String',
      expected: '',
      expectedError: null
    },
    {
      value: 'true',
      type: 'Boolean',
      expected: true,
      expectedError: null
    },
    {
      value: 'false',
      type: 'Boolean',
      expected: false,
      expectedError: null
    },
    {
      value: '',
      type: 'Boolean',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 'dsfasdfsdf',
      type: 'Boolean',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 'TRUE',
      type: 'Boolean',
      expected: true,
      expectedError: null
    },
    {
      value: 'True',
      type: 'Boolean',
      expected: true,
      expectedError: null
    },
    {
      value: '123.456',
      type: 'Number',
      expected: 123.456,
      expectedError: null
    },
    {
      value: '458967340869745896',
      type: 'Number',
      expected: 458967340869745896,
      expectedError: null
    },
    {
      value: '0',
      type: 'Number',
      expected: 0,
      expectedError: null
    },
    {
      value: '',
      type: 'Number',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 'Infinity',
      type: 'Number',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 'NaN',
      type: 'Number',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 'invalid',
      type: 'Number',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: '-300',
      type: 'Number',
      expected: -300,
      expectedError: null
    },
    {
      value: '1000',
      type: 'Bigint',
      expected: 1000n,
      expectedError: null
    },
    {
      value: '-2',
      type: 'Bigint',
      expected: -2n,
      expectedError: null
    },
    {
      value: '11.2',
      type: 'Bigint',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: '',
      type: 'Bigint',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 'dfgdfg',
      type: 'Bigint',
      expected: null,
      expectedError: EnvParserException
    },
    {
      value: 's1',
      type: 'Symbol',
      expected: Symbol.for('s1'),
      expectedError: null
    },
    {
      value: '',
      type: 'Symbol',
      expected: Symbol.for(''),
      expectedError: null
    },
    {
      value: 'jfgdhhl4uhflrudsf',
      type: 'Symbol',
      expected: Symbol.for('jfgdhhl4uhflrudsf'),
      expectedError: null
    },
    {
      value: 'test',
      type: 'invalid_type',
      expected: null,
      expectedError: EnvParserException
    }
  ]

  it.each(cases)('#$# $type ($value)', (args) => {
    const func = () =>
      parser.parseValue((args as any).path, args.value, args.type)

    if (args.expectedError) {
      expect(func).toThrow(args.expectedError)
    } else {
      expect(func()).toBe(args.expected)
    }
  })
})

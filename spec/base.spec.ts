import {
  EnvMetadataMissingException,
  EnvVariableMissingException
} from '../src/EnvExceptions'
import { EnvManager } from '../src/EnvManager'
import { EnvNested } from '../src/EnvNested'
import { EnvSchema } from '../src/EnvSchema'
import { EnvProperty } from '../src/EnvProperty'

describe('Base', () => {
  it('should load variable from process.env', () => {
    process.env.T1 = 'hello'

    @EnvSchema()
    class Env {
      @EnvProperty('T1')
      t1: string
    }

    const env = new Env()

    expect(env.t1).toBe('hello')

    process.env.T1 = undefined
  })

  it('should load variable from custom source', () => {
    @EnvSchema({ source: { T2: 'there' } })
    class Env {
      @EnvProperty('T2')
      t2: string
    }

    const env = new Env()

    expect(env.t2).toBe('there')
  })

  it('should apply prefix if given', async () => {
    @EnvSchema({ source: { PRE_AAA: '13' }, prefix: 'PRE_' })
    class Env {
      @EnvProperty('AAA')
      aaa: number
    }

    const env = new Env()

    expect(env.aaa).toBe(13)
  })

  it('should transform primitive types automatically', () => {
    const data = {
      STRING: 'some string',
      NUMBER: '123.456',
      BOOL: 'true',
      BIGINT: '1000',
      SYMBOL: 'sym'
    }

    @EnvSchema({ source: data })
    class Env {
      @EnvProperty('STRING')
      str: string

      @EnvProperty('NUMBER')
      num: number

      @EnvProperty('BOOL')
      bool: boolean

      @EnvProperty('BIGINT')
      bn: bigint

      @EnvProperty('SYMBOL')
      sym: symbol
    }

    const t = new Env()

    expect(t.str).toBe('some string')
    expect(t.num).toBe(123.456)
    expect(t.bool).toBe(true)
    expect(t.bn).toBe(1000n)
    expect(t.sym).toBe(Symbol.for('sym'))
  })

  it('should use custom transfermer if given', () => {
    @EnvSchema({ source: { CUSTOM_HEX: 'ff00ff' } })
    class Env {
      @EnvProperty('CUSTOM_HEX', {
        transformer: (value) => Buffer.from(value, 'hex')
      })
      num: Buffer
    }

    const t = new Env()

    expect(t.num).toEqual(Buffer.from([255, 0, 255]))
  })

  it('should use default value if given', () => {
    @EnvSchema({ source: {} })
    class Env {
      @EnvProperty('MISSING', { default: '42' })
      num: bigint
    }

    const t = new Env()
    expect(t.num).toBe(42n)
  })

  it('should return undefined when no value and optional', () => {
    @EnvSchema({ source: {} })
    class Env {
      @EnvProperty('MISSING', { optional: true })
      num?: number
    }

    const t = new Env()

    expect(t.num).toBe(undefined)
  })

  it('should throw error when value required and none given', () => {
    @EnvSchema({ source: {} })
    class Env {
      @EnvProperty('MISSING')
      num: number
    }

    const t = new Env()

    expect(() => t.num).toThrow(EnvVariableMissingException)
  })

  it('should work with instance from env manager', () => {
    @EnvSchema({ source: { VAL: 'true' } })
    class Env {
      @EnvProperty('VAL')
      val: boolean
    }

    const env = EnvManager.getPlainInstance(Env)

    expect(env.val).toBe(true)
  })

  it('should work with nested schema', () => {
    const source = { NESTED_PROP: 'str' }

    @EnvSchema({ source, prefix: 'NESTED_' })
    class Nested {
      @EnvProperty('PROP')
      prop: string
    }

    @EnvSchema({ source })
    class Root {
      @EnvNested(() => Nested)
      nested: Nested
    }

    const t = new Root()

    expect(t.nested.prop).toBe('str')
  })

  it('should return updated value from environment with dynamic instance', async () => {
    process.env.T13 = '5'

    @EnvSchema({ source: process.env })
    class Env {
      @EnvProperty('T13')
      t13: number
    }

    const env = EnvManager.getDynamicInstance(Env)

    expect(env.t13).toBe(5)

    process.env.T13 = '10'

    expect(env.t13).toBe(10)
  })

  it('should return old value from environment with plain instance', async () => {
    process.env.ASD = '123'

    @EnvSchema({ source: process.env })
    class Env {
      @EnvProperty('ASD')
      asd: string
    }

    const env = EnvManager.getPlainInstance(Env)

    expect(env.asd).toBe('123')

    process.env.ASD = '456'

    expect(env.asd).toBe('123')
  })

  it('should throw EnvMetadataMissingException when @EnvSchema not used', () => {
    class Env {
      @EnvProperty('ASD')
      asdzs: string
    }

    expect(() => EnvManager.getPlainInstance(Env)).toThrow(
      EnvMetadataMissingException
    )
  })
})

import { EnvSchema } from '../src/EnvSchema'
import { EnvProperty } from '../src/EnvProperty'
import { Metadata } from '../src/Metadata'

describe('EnvProperty', () => {
  it('attaches metadata to parent object', () => {
    @EnvSchema()
    class TestObject {
      @EnvProperty('NUM')
      num: number

      @EnvProperty('BOOL')
      bool: boolean
    }

    const obj = new TestObject()
    const meta = Metadata.forObject(obj)

    expect({ ...obj }).toEqual({})
    expect(meta.properties.num).toBeDefined()
    expect(meta.properties.bool).toBeDefined()
  })
})

import { EnvCircularOrNullException } from '../src/EnvExceptions'

describe('Circular', () => {
  it('should throw error when direct circular structure', async () => {
    await expect(() => import('./fixtures/Class1A')).rejects.toThrow(
      EnvCircularOrNullException
    )
  })

  it('should throw error when indirect circular structure', async () => {
    await expect(() => import('./fixtures/Class1B')).rejects.toThrow(
      EnvCircularOrNullException
    )
  })

  it('should throw error when null class ref', async () => {
    await expect(() => import('./fixtures/ClassNull')).rejects.toThrow(
      EnvCircularOrNullException
    )
  })
})

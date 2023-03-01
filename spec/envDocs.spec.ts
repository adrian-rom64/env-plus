import { EnvDocs } from '../src/EnvDocs'
import { BasicExampleSchema } from './fixtures/BasicExampleSchema'

describe('EnvDocs', () => {
  it('test', async () => {
    const docs = new EnvDocs()

    const c = new BasicExampleSchema()
    await docs.saveEnvExample(c, '.env.example')
  })
})

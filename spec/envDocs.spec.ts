import { mkdir } from 'fs/promises'
import { EnvManager } from '../src/EnvManager'
import { BasicExampleSchema } from './fixtures/BasicExampleSchema'

describe('EnvDocs', () => {
  beforeAll(async () => {
    await mkdir('tmp', { recursive: true })
  })

  it('should generate env example', async () => {
    await EnvManager.saveEnvExample(BasicExampleSchema, './tmp/.env.example')
  })

  it('should generate markdown table', async () => {
    await EnvManager.saveMarkdownTable(BasicExampleSchema, './tmp/env.md')
  })
})

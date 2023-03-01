import { Metadata } from './Metadata'

export interface EnvSchemaOptions {
  source?: Record<string, string | undefined>
  prefix?: string
}

export const EnvSchema = (opts: EnvSchemaOptions = {}): ClassDecorator => {
  return (constructor: Function) => {
    const metadata = Metadata.forObject(constructor.prototype)

    metadata
      .attachSchemaOptions({
        source: opts.source ?? process.env,
        prefix: opts.prefix ?? ''
      })
      .assignNestedObjects()
      .assignGetters()
      .assignKey()
      .finish()
  }
}

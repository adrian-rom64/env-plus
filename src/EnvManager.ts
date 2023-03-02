import { config as configure, DotenvConfigOptions } from 'dotenv'
import { EnvExampleGenerator } from './EnvExampleGenerator'
import { EnvMetadataMissingException } from './EnvExceptions'
import { ClassRef } from './EnvInterfaces'
import { EnvMarkdownGenerator } from './EnvMarkdownGenerator'
import { Metadata } from './Metadata'

export interface EnvManagerOptions {
  dotenvOptions?: DotenvConfigOptions
  skipDotenv?: boolean
}

export class EnvManager {
  private static initialized = false

  static saveEnvExample<B extends boolean = false>(
    schema: Function,
    path?: string,
    sync?: B
  ): B extends true ? void : Promise<void> {
    return EnvExampleGenerator.saveEnvExample(
      schema,
      path ?? '.env.example',
      sync ?? false
    ) as any
  }

  static saveMarkdownTable<B extends boolean = false>(
    schema: Function,
    path?: string,
    sync?: B
  ): B extends true ? void : Promise<void> {
    const generator = new EnvMarkdownGenerator(schema)

    return generator.saveMarkdownTable(path ?? 'env.md', sync ?? false) as any
  }

  static getDynamicInstance<T extends ClassRef>(
    schema: T,
    options?: EnvManagerOptions
  ): InstanceType<T> {
    this.initialize(options)

    const meta = Metadata.forObject(schema.prototype)

    if (!meta.ready) throw new EnvMetadataMissingException()

    return new schema()
  }

  static getPlainInstance<T extends ClassRef>(
    schema: T,
    options?: EnvManagerOptions
  ): InstanceType<T> {
    return this.dynamicToPlain(this.getDynamicInstance(schema, options))
  }

  private static dynamicToPlain<T extends Record<string, any>>(instance: T): T {
    const meta = Metadata.forObject(instance)
    const obj: Record<string, any> = {}

    for (const key of Object.keys(meta.properties)) {
      obj[key] = instance[key]
    }

    for (const key of Object.keys(meta.nested)) {
      obj[key] = this.dynamicToPlain(instance[key])
    }

    return obj as any
  }

  private static initialize(opts: EnvManagerOptions = {}) {
    if (this.initialized) return

    if (!opts.skipDotenv) {
      configure(opts.dotenvOptions)
    }

    this.initialized = true
  }
}

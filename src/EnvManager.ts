import { writeFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { EnvExampleGenerator } from './EnvExampleGenerator'
import { EnvMetadataMissingException } from './EnvExceptions'
import { ClassRef } from './EnvInterfaces'
import { EnvMarkdownGenerator } from './EnvMarkdownGenerator'
import { Metadata } from './Metadata'

export class EnvManager {
  private static dynamicInstances: Record<string, any> = {}
  private static plainInstances: Record<string, any> = {}

  static async writeEnvExample(schema: ClassRef, path?: string) {
    const instance = this.getDynamicInstance(schema)
    const envExampleGenerator = new EnvExampleGenerator()

    await envExampleGenerator.saveEnvExample(instance, path ?? '.env.example')
  }

  static writeEnvExampleSync(schema: ClassRef, path?: string) {
    const instance = this.getDynamicInstance(schema)
    const envExampleGenerator = new EnvExampleGenerator()

    envExampleGenerator.saveEnvExampleSync(instance, path ?? '.env.example')
  }

  static async writeMarkdownTable(schema: ClassRef, path?: string) {
    const instance = this.getDynamicInstance(schema)
    const envMarkdownGenerator = new EnvMarkdownGenerator(instance)

    await writeFile(
      path ?? 'env.md',
      envMarkdownGenerator.generateTable(),
      'utf8'
    )
  }

  static writeMarkdownTableSync(schema: ClassRef, path?: string) {
    const instance = this.getDynamicInstance(schema)
    const envMarkdownGenerator = new EnvMarkdownGenerator(instance)

    writeFileSync(
      path ?? 'env.md',
      envMarkdownGenerator.generateTable(),
      'utf8'
    )
  }

  static getDynamicInstance<T extends ClassRef>(schema: T): InstanceType<T> {
    const meta = Metadata.forObject(schema.prototype)

    if (!meta.ready) throw new EnvMetadataMissingException()

    if (this.dynamicInstances[meta.key]) {
      return this.dynamicInstances[meta.key]
    }

    this.dynamicInstances[meta.key] = new schema()

    return this.dynamicInstances[meta.key]
  }

  static getPlainInstance<T extends ClassRef>(schema: T): InstanceType<T> {
    const meta = Metadata.forObject(schema.prototype)

    if (this.plainInstances[meta.key]) {
      return this.plainInstances[meta.key]
    }

    this.plainInstances[meta.key] = this.dynamicToPlain(
      this.getDynamicInstance(schema)
    )

    return this.plainInstances[meta.key]
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
}

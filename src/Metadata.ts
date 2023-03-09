import { EnvVariableMissingException } from './EnvExceptions'
import { EnvValueParser } from './EnvValueParser'

export interface PropertyMetadata {
  path: string
  type: string
  default?: string
  required: boolean
  example?: string
  description?: string
  transformer?: (value: string) => any
}

export interface SchemaMetadata {
  source: Record<string, string | undefined>
  prefix: string
}

export class Metadata {
  static readonly METADATA_OBJECT_KEY = '_envmetadata'

  public ready = false
  public properties: Record<string, PropertyMetadata> = {}
  public object: SchemaMetadata
  public nested: Record<string, Object> = {}

  private parent: Object
  private parser = new EnvValueParser()

  private constructor(parent: Object) {
    this.parent = parent
  }

  static forObject(target: Object) {
    const current: Metadata = (target as any)[Metadata.METADATA_OBJECT_KEY]
    if (current) return current

    const meta = new Metadata(target)

    Object.defineProperty(target, Metadata.METADATA_OBJECT_KEY, {
      enumerable: false,
      writable: false,
      value: meta
    })

    return meta
  }

  public attachSchemaOptions(data: SchemaMetadata) {
    this.object = data

    return this
  }

  public assignGetters() {
    for (const [key, props] of Object.entries(this.properties)) {
      Object.defineProperty(this.parent, key, {
        get: () => this.getValue(props)
      })
    }

    return this
  }

  public assignNestedObjects() {
    for (const [key, obj] of Object.entries(this.nested)) {
      Object.defineProperty(this.parent, key, {
        value: obj
      })
    }

    return this
  }

  public finish() {
    this.ready = true
  }

  public getValue(props: PropertyMetadata) {
    const value = this.object.source[this.getPath(props.path)] ?? props.default

    if (props.required && value === undefined) {
      throw new EnvVariableMissingException(props.path)
    }

    if (value === undefined) return undefined

    if (props.transformer) return props.transformer(value!)

    const parsed = this.parser.parseValue(props.path, value!, props.type)

    return parsed
  }

  private getPath(path: string) {
    return this.object.prefix + path
  }
}

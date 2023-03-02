import 'reflect-metadata'
import { Metadata, PropertyMetadata } from './Metadata'
import type { PropertyDecorator } from './EnvInterfaces'

export interface EnvPropertyOptions {
  description?: string
  example?: string
  optional?: boolean
  default?: string
  transformer?: (value: string) => any
}

export const EnvProperty = (
  path: string,
  opts: EnvPropertyOptions = {}
): PropertyDecorator => {
  return (target: Object, propertyKey: string) => {
    const metadata = Metadata.forObject(target)

    const type = Reflect.getMetadata('design:type', target, propertyKey).name

    const props: PropertyMetadata = {
      path,
      type,
      default: opts.default,
      optional: opts.optional ?? false,
      example: opts.example,
      description: opts.description,
      transformer: opts.transformer
    }

    metadata.properties[propertyKey] = props
  }
}

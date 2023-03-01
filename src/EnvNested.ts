import { Metadata } from './Metadata'
import type { ClassRef, PropertyDecorator } from './EnvInterfaces'
import { EnvCircularOrNullException } from './EnvExceptions'

export const EnvNested = (ref: () => ClassRef): PropertyDecorator => {
  return (target: Object, propertyKey: string) => {
    if (!ref()) throw new EnvCircularOrNullException(propertyKey)

    const metadata = Metadata.forObject(target)
    metadata.nested[propertyKey] = new (ref())()
  }
}

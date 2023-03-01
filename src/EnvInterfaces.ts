export type PropertyDecorator = (target: Object, propertyKey: string) => void

export interface ClassRef extends Function {
  new (): any
}

export type ClassDecorator = (constructor: Function) => void

export class EnvException extends Error {}

export class EnvParserException extends EnvException {
  constructor(path: string, value: string | undefined, type: string) {
    super(`Unable to parse ${path} with value ${value} to ${type}`)
  }
}

export class EnvVariableMissingException extends EnvException {
  constructor(path: string) {
    super(`Env variable ${path} is missing.`)
  }
}

export class EnvCircularOrNullException extends EnvException {
  constructor(propertyKey: string) {
    const e1 = `Class reference is missing for nested property ${propertyKey}.`
    const e2 = 'Is there a circular structure in env schemas?'
    const e3 = 'Have you passed valid env schema to @EnvNested(() => ...)?'

    super([e1, e2, e3].join(' '))
  }
}

export class EnvMetadataMissingException extends EnvException {
  constructor() {
    const e1 = 'Object metadata is missing.'
    const e2 = 'Have you forgot to use @EnvObject() decorator on a class?'

    super([e1, e2].join(' '))
  }
}

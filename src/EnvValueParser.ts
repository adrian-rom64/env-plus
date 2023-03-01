import { EnvParserException } from './EnvExceptions'

export class EnvValueParser {
  public parseValue(path: string, value: string, type: string) {
    const t = type.toLowerCase()

    switch (t) {
      case 'string':
        return this.parseString(path, value)
      case 'number':
        return this.parseNumber(path, value)
      case 'boolean':
        return this.parseBoolean(path, value)
      case 'bigint':
        return this.parseBigInt(path, value)
      case 'symbol':
        return this.parseSymbol(path, value)
      default:
        throw new EnvParserException(path, value, type)
    }
  }

  private parseString(_path: string, value: string) {
    return value
  }

  private parseBoolean(path: string, value: string) {
    const lower = value.toLowerCase()

    if (lower !== 'false' && lower !== 'true') {
      throw new EnvParserException(path, value, 'boolean')
    }

    return value.toLowerCase() === 'true'
  }

  private parseNumber(path: string, value: string) {
    const num = Number(value)

    if (!Number.isFinite(num) || !value) {
      throw new EnvParserException(path, value, 'number')
    }

    return num
  }

  private parseBigInt(path: string, value: string) {
    const err = new EnvParserException(path, value, 'bigint')

    if (!value) throw err

    try {
      return BigInt(value)
    } catch {
      throw err
    }
  }

  private parseSymbol(_path: string, value: string) {
    return Symbol.for(value)
  }
}

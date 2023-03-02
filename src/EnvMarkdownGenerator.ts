import { Metadata, PropertyMetadata } from './Metadata'

interface MaxColumnLengths {
  path: number
  description: number
  required: number
  example: number
  default: number
}

export class EnvMarkdownGenerator {
  private max: MaxColumnLengths
  private meta: Metadata

  constructor(target: Object) {
    this.meta = Metadata.forObject(target)
  }

  generateTable() {
    this.max = this.getColumnLength(this.meta)

    return `${this.renderTableHeader()}\n${this.renderDivider()}\n${this.renderRows(
      this.meta
    )}\n`
  }

  private renderRows(meta: Metadata) {
    return Object.values(meta.properties)
      .map((props) => this.renderTableRow(props))
      .join('\n')
  }

  private renderTableHeader() {
    const columns = [
      'Name'.padEnd(this.max.path),
      'Description'.padEnd(this.max.description),
      'Required'.padEnd(this.max.required),
      'Example'.padEnd(this.max.example),
      'Default'.padEnd(this.max.default)
    ]

    return `| ${columns.join(' | ')} |`
  }

  private renderDivider() {
    const content = Object.values(this.max)
      .map((max) =>
        Array(max ?? 1)
          .fill('-')
          .join('')
      )
      .join(' | ')

    return `| ${content} |`
  }

  private renderTableRow(p: PropertyMetadata) {
    const colums = [
      p.path.padEnd(this.max.path),
      (p.description ?? '-').padEnd(this.max.description),
      (p.optional ? 'no' : 'yes').padEnd(this.max.required),
      (p.example ?? '-').padEnd(this.max.example),
      (p.default ?? '-').padEnd(this.max.default)
    ]

    return `| ${colums.join(' | ')} |`
  }

  private getColumnLength(meta: Metadata) {
    const max: MaxColumnLengths = {
      path: 'name'.length,
      description: 'description'.length,
      required: 'required'.length,
      example: 'example'.length,
      default: 'default'.length
    }

    const increaseMax = (key: keyof MaxColumnLengths, value = '') => {
      max[key] = value.length > max[key] ? value.length : max[key]
    }

    for (const [key, value] of Object.entries(meta.properties)) {
      increaseMax('path', value.path)
      increaseMax('description', value.description)
      increaseMax('required', 'yes')
      increaseMax('example', value.example)
      increaseMax('default', value.default)
    }

    return max
  }
}

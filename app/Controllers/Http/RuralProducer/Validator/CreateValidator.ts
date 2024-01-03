import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator, rules, schema } from '@ioc:Adonis/Core/Validator'

import { isValidCnpj, isValidCpf } from 'App/Helper/DocumentValidator'
validator.rule('cpfOrCnpj', (value, _, options) => {
  if (!isValidCnpj(value) && !isValidCpf(value)) {
    options.errorReporter.report(
      options.pointer,
      'cpfOrCnpj',
      'cpf or cnpj validation failed, invalid cpf or cnpj',
      options.arrayExpressionPointer
    )
  }
})

export default class CreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    documentNumber: schema.string({}, [rules.cpfOrCnpj()]),
    producerName: schema.string({}, [rules.maxLength(120)]),
    farmName: schema.string({}, [rules.maxLength(120)]),
    city: schema.string({}, [rules.maxLength(120)]),
    state: schema.string({}, [rules.maxLength(120)]),

    totalHectares: schema.number(),
    arableHectares: schema.number(),
    vegetationHectares: schema.number(),
    cropsIds: schema.array.optional().members(
      schema.number([
        rules.exists({
          table: 'crops',
          column: 'id',
        }),
      ])
    ),
  })
}

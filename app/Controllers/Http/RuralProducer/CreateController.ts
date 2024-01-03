import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateValidator from './Validator/CreateValidator'

import RuralProducer from 'App/Models/RuralProducer'

export default class CreateController {
  /**
   * @swagger
   *  /rural-producers:
   *     post:
   *       tags:
   *         - Rural Producer
   *       description: Create a new Rural Producer
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 documentNumber:
   *                   type: string
   *                   example: 123456789
   *                   required: true
   *                 producerName:
   *                   type: string
   *                   example: 'João Agricultor'
   *                   required: true
   *                 farmName:
   *                   type: string
   *                   example: 'Fazenda XYZ'
   *                   required: true
   *                 city:
   *                   type: string
   *                   example: 'São Paulo'
   *                   required: true
   *                 state:
   *                   type: string
   *                   example: 'São Paulo'
   *                   required: true
   *                 totalHectares:
   *                   type: number
   *                   example: 1
   *                   required: true
   *                 arableHectares:
   *                   type: number
   *                   example: 1
   *                   required: true
   *                 vegetationHectares:
   *                   type: number
   *                   example: 1
   *                   required: true
   *                 cropsIds:
   *                   type: array
   *                   example: [1 ,2]
   *                   required: true
   *               required:
   *                 - documentNumber
   *                 - producerName
   *                 - farmName
   *                 - city
   *                 - state
   *                 - totalHectares
   *                 - arableHectares
   *                 - vegetationHectares
   *                 - cropsIds
   *       produces:
   *         - application/json
   *       responses:
   *         201:
   *           description: Created
   *         422:
   *           description: Invalid payload
   */
  public async index({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(CreateValidator)

    if (
      validatedData.totalHectares <
      validatedData.arableHectares + validatedData.vegetationHectares
    ) {
      return response.status(400).send('Total area must be larger or equal than other areas sum')
    }

    const ruralProducer = await RuralProducer.create(validatedData)

    if (validatedData.cropsIds && validatedData.cropsIds.length > 0) {
      await ruralProducer.related('cropsIds').attach(validatedData.cropsIds)
    }

    await ruralProducer?.load('cropsIds')

    return ruralProducer
  }
}

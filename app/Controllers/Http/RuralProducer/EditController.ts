import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EditValidator from './Validator/EditValidator'

import RuralProducer from 'App/Models/RuralProducer'

export default class EditController {
  /**
   * @swagger
   *  /rural-producers/{id}:
   *     put:
   *       tags:
   *         - Rural Producer
   *       description: Edit a existent Rural Producer
   *       parameters:
   *          - name: id
   *            in:  path
   *            required: true
   *            schema:
   *            type: string
   *            description: Rural Producer Id.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               allowEmptyValue: false
   *               properties:
   *                 documentNumber:
   *                   type: string
   *                   example: 123456789
   *                   required: false
   *                 producerName:
   *                   type: string
   *                   example: 'João Agricultor'
   *                   required: false
   *                 farmName:
   *                   type: string
   *                   example: 'Fazenda XYZ'
   *                   required: false
   *                 city:
   *                   type: string
   *                   example: 'São Paulo'
   *                   required: false
   *                 state:
   *                   type: string
   *                   example: 'São Paulo'
   *                   required: false
   *                 totalHectares:
   *                   type: number
   *                   example: 1
   *                   required: false
   *                 arableHectares:
   *                   type: number
   *                   example: 1
   *                   required: false
   *                 vegetationHectares:
   *                   type: number
   *                   example: 1
   *                   required: false
   *                 cropsIds:
   *                   type: array
   *                   example: [1 ,2]
   *                   required: false
   *       produces:
   *         - application/json
   *       responses:
   *         201:
   *           description: Updated
   */
  public async index({ request, response, params: { id } }: HttpContextContract) {
    const ruralProducer = await RuralProducer.find(id)

    if (!ruralProducer) {
      return response.status(404)
    }

    const validatedData = await request.validate(EditValidator)

    if (
      validatedData.totalHectares &&
      validatedData.arableHectares &&
      validatedData.vegetationHectares
    ) {
      if (
        validatedData.totalHectares <
        validatedData.arableHectares + validatedData.vegetationHectares
      ) {
        return response.status(400).send('Total area must be larger or equal than other areas sum')
      }
    }

    ruralProducer.merge({ ...validatedData })

    if (validatedData.cropsIds !== undefined) {
      await ruralProducer.related('cropsIds').detach()

      if (validatedData.cropsIds) {
        await ruralProducer.related('cropsIds').attach(validatedData.cropsIds)
      }
    }

    await ruralProducer.save()
    await ruralProducer.load('cropsIds')

    return ruralProducer
  }
}

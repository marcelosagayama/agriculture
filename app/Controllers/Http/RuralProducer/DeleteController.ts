import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RuralProducer from 'App/Models/RuralProducer'

export default class DeleteController {
  /**
   * @swagger
   *  /rural-producers/{id}:
   *     delete:
   *       tags:
   *         - Rural Producer
   *       description: Delete a existent Rural Producer
   *       parameters:
   *          - name: id
   *            in:  path
   *            required: true
   *            schema:
   *            type: string
   *            description: Rural Producer Id.
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index({ response, params: { id } }: HttpContextContract) {
    const ruralProducer = await RuralProducer.find(id)

    if (!ruralProducer) {
      return response.status(404)
    }

    return await ruralProducer.delete()
  }
}

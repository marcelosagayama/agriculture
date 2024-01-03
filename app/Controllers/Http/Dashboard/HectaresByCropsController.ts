import Database from '@ioc:Adonis/Lucid/Database'

export default class HectaresByCropsController {
  /**
   * @swagger
   *  /dashboard/hectares-by-crops:
   *     get:
   *       tags:
   *         - Dashboard
   *       description: Return total hectares by crop
   *       produces:
   *         - application/json
   *       responses:
   *         200:
   *           description: Ok
   */
  public async index() {
    const hectaresByCrop = await Database.rawQuery(
      'select c.id, c.name,sum(rp.arable_hectares) as arable_hectares from crops c left join rural_producer_has_crops rphc on c.id = rphc.crop_id left join rural_producers rp on rp.id = rphc.rural_producer_id group by c.id, c.name'
    )

    return hectaresByCrop.rows.map((crop) => {
      return {
        name: crop.name,
        arable_hectares: Number(crop.arable_hectares),
      }
    })
  }
}

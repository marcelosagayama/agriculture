import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import RuralProducer, { RuralProducerType } from 'App/Models/RuralProducer'
import Crop from 'App/Models/Crop'

export default class extends BaseSeeder {
  public async run() {
    const ruralProducerSeeder: RuralProducerType[] = [
      {
        documentNumber: '58407595039',
        producerName: 'João',
        farmName: 'Fazenda João',
        city: 'São Paulo',
        state: 'São Paulo',
        totalHectares: 12,
        arableHectares: 11,
        vegetationHectares: 1,
      },
      {
        documentNumber: '35296430093',
        producerName: 'José',
        farmName: 'Fazenda José',
        city: 'Diadema',
        state: 'São Paulo',
        totalHectares: 20,
        arableHectares: 16,
        vegetationHectares: 4,
      },
    ]

    const crops = await Crop.all()
    const cropsIds = crops.map((obj) => obj.id)

    await Promise.all(
      ruralProducerSeeder.map(async ({ ...ruralProducer }) => {
        // Mix crops
        cropsIds.sort(() => Math.random() - 0.5)

        const ruralProcucerCreated = await RuralProducer.updateOrCreate(
          { documentNumber: ruralProducer.documentNumber },
          ruralProducer
        )
        await ruralProcucerCreated.related('cropsIds').detach()

        // Get random Crops
        await ruralProcucerCreated
          .related('cropsIds')
          .attach(cropsIds.slice(0, Math.ceil(Math.random() * cropsIds.length)))
      })
    )
  }
}

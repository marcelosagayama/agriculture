import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Crop, { CropType } from 'App/Models/Crop'

export default class extends BaseSeeder {
  public async run() {
    const cropsSeeder: CropType[] = [
      { name: 'Soja' },
      { name: 'Milho' },
      { name: 'Algodão' },
      { name: 'Café' },
      { name: 'Cana de Açucar' },
    ]

    await Promise.all(
      cropsSeeder.map(async ({ name }) => {
        await Crop.updateOrCreate({ name }, { name })
      })
    )
  }
}

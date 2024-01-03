import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import Crop from 'App/Models/Crop'

export default class RuralProducer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public documentNumber: string

  @column()
  public producerName: string

  @column()
  public farmName: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public totalHectares: number

  @column()
  public arableHectares: number

  @column()
  public vegetationHectares: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Crop, {
    pivotTable: 'rural_producer_has_crops',
    localKey: 'id',
    pivotForeignKey: 'rural_producer_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'crop_id',
  })
  public cropsIds: ManyToMany<typeof Crop>
}

export type RuralProducerType = {
  documentNumber: string
  producerName: string
  farmName: string
  city: string
  state: string
  totalHectares: number
  arableHectares: number
  vegetationHectares: number
  cropsIds?: Crop[]
}

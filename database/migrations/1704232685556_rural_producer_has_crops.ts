import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rural_producer_has_crops'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['rural_producer_id', 'crop_id'])
      table
        .integer('rural_producer_id')
        .references('id')
        .inTable('rural_producers')
        .onDelete('CASCADE')

      table.integer('crop_id').references('id').inTable('crops').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

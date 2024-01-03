import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rural_producers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('document_number', 120).notNullable()
      table.string('producer_name', 120).notNullable()
      table.string('farm_name', 120).notNullable()
      table.string('city', 120).notNullable()
      table.string('state', 120).notNullable()
      table.integer('total_hectares').notNullable()
      table.integer('arable_hectares').notNullable()
      table.integer('vegetation_hectares').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

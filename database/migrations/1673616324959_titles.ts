import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'titles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('series_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('series')
        .onDelete('SET NULL');

      table.string('name').notNullable().unique();
      table.string('name_ar').nullable();
      table.string('name_hi').nullable();
      table.string('name_ja').nullable();
      table.string('name_ko').nullable();
      table.string('name_zh').nullable();

      table.string('wikipedia').nullable();
      table.string('wikipedia_ar').nullable();
      table.string('wikipedia_hi').nullable();
      table.string('wikipedia_ja').nullable();
      table.string('wikipedia_kr').nullable();
      table.string('wikipedia_zh').nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

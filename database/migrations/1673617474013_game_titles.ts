import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'game_titles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_series_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('game_series')
        .onDelete('SET NULL');

      table.string('name');
      table.string('name_ar').nullable();
      table.string('name_hi').nullable();
      table.string('name_ja').nullable();
      table.string('name_kr').nullable();
      table.string('name_zh').nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'series_translation';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('series_id').unsigned().references('series.id').onDelete('CASCADE');
      table.integer('translation_id').unsigned().references('translations.id').onDelete('CASCADE');
      table.unique(['series_id', 'translation_id']);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

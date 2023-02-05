import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'games';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('title_id').unsigned().nullable().references('titles.id').onDelete('SET NULL');
      table.integer('main_id').unsigned().nullable().references('games.id').onDelete('SET NULL');
      table
        .integer('platform_id')
        .unsigned()
        .notNullable()
        .references('platforms.id')
        .onDelete('SET NULL');

      table.string('name');
      table.string('display_name');
      table.string('region').nullable();
      table.string('language').nullable();

      table.string('serial').nullable();
      table.string('version').nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

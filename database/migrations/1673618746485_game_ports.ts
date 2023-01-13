import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'game_ports';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_title_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('game_titles')
        .onDelete('CASCADE');

      table.string('platform').notNullable();
      table.string('region').nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

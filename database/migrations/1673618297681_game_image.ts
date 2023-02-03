import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'game_image';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('game_id').unsigned().notNullable().references('games.id').onDelete('CASCADE');
      table
        .integer('image_id')
        .unsigned()
        .notNullable()
        .references('images.id')
        .onDelete('CASCADE');
      table.unique(['game_id', 'image_id']);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

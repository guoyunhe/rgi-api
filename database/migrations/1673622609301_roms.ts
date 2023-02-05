import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'roms';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('game_id').unsigned().notNullable().references('games.id').onDelete('CASCADE');

      table.string('name').nullable();
      table.bigInteger('size').nullable();
      table.string('crc', 8).nullable();
      table.string('md5', 32).nullable();
      table.string('sha1', 40).nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

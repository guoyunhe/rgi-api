import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'game_roms';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('game_port_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('game_ports')
        .onDelete('CASCADE');

      table.integer('disc_number').defaultTo(1);

      table.string('serial').nullable();

      table.integer('size').nullable();
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

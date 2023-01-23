import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'games';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table
        .integer('title_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('titles')
        .onDelete('SET NULL');

      table
        .integer('main_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('games')
        .onDelete('SET NULL');

      table
        .integer('boxart_image_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table
        .integer('title_image_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table
        .integer('snap_image_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table
        .integer('boxart_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('images')
        .onDelete('SET NULL');

      table.string('name');

      table.string('platform').notNullable();
      table.string('region').nullable();
      table.string('language').nullable();

      table.integer('disc').nullable();
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

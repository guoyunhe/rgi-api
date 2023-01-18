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
      table.string('name_ar').nullable();
      table.string('name_de').nullable();
      table.string('name_es').nullable();
      table.string('name_fa').nullable();
      table.string('name_fi').nullable();
      table.string('name_fr').nullable();
      table.string('name_hi').nullable();
      table.string('name_it').nullable();
      table.string('name_ja').nullable();
      table.string('name_ko').nullable();
      table.string('name_nl').nullable();
      table.string('name_po').nullable();
      table.string('name_pt').nullable();
      table.string('name_ru').nullable();
      table.string('name_sv').nullable();
      table.string('name_uk').nullable();
      table.string('name_vi').nullable();
      table.string('name_zh').nullable();

      table.string('platform').notNullable();
      table.string('region').nullable();
      table.string('language').nullable();

      table.integer('disc').defaultTo(1);
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

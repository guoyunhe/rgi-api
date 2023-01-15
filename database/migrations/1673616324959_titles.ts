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

      table.string('wikipedia').nullable();
      table.string('wikipedia_ar').nullable();
      table.string('wikipedia_de').nullable();
      table.string('wikipedia_es').nullable();
      table.string('wikipedia_fa').nullable();
      table.string('wikipedia_fi').nullable();
      table.string('wikipedia_fr').nullable();
      table.string('wikipedia_hi').nullable();
      table.string('wikipedia_it').nullable();
      table.string('wikipedia_ja').nullable();
      table.string('wikipedia_ko').nullable();
      table.string('wikipedia_nl').nullable();
      table.string('wikipedia_po').nullable();
      table.string('wikipedia_pt').nullable();
      table.string('wikipedia_ru').nullable();
      table.string('wikipedia_sv').nullable();
      table.string('wikipedia_uk').nullable();
      table.string('wikipedia_vi').nullable();
      table.string('wikipedia_zh').nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'series';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

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

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

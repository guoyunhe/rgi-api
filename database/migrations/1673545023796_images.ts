import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'images';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').unsigned().nullable().references('users.id').onDelete('SET NULL');

      table.string('path').notNullable().unique();
      table.string('type').notNullable();
      table.integer('size').notNullable();
      table.integer('width').notNullable();
      table.integer('height').notNullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

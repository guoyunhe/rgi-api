import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'links';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('user_id').unsigned().nullable().references('users.id').onDelete('SET NULL');

      table.string('url').notNullable().unique();
      table.string('title').nullable();
      table.text('excerpt').nullable();
      table.decimal('score', 3, 1).nullable(); // 00.0 to 10.0

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

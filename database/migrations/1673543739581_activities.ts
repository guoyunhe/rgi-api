import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'activities';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('type').notNullable().index();
      table.integer('user_id').unsigned().nullable().references('users.id').onDelete('SET NULL');
      table.string('target_type').nullable().index();
      table.integer('target_id').unsigned().nullable().index();
      table.string('action').notNullable();
      table.json('data').nullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

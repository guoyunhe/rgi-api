import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('avatar_id')
        .unsigned()
        .nullable()
        .references('images.id')
        .onDelete('SET NULL')
        .after('role');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

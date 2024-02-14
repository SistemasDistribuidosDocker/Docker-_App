/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('nutri', function(table) {
      table.increments('id').primary();
      table.integer('yearstart').notNullable();
      table.integer('yearend').notNullable();
      table.string('locationabbr').notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('nutri');
  };
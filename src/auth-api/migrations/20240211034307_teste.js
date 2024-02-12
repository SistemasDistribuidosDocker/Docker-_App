exports.up = function (knex) {
    return knex.schema.createTable('escolas', function (table) {
      table.increments('id').primary();
      table.string('nome');
      table.string('responsavel');
      table.string('contacto');
      table.string('morada');
      table.string('user_id');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('escolas');
  };

// migrations/xxxx_create_users.js
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('user');
      table.string('email').notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  
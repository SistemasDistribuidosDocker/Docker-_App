/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sickness", function (table) {
    table.increments("id").primary();
    table.string("group").notNullable;
    table.string("state").notNullable();
    table.string("conditionGroup").notNullable();
    table.string("condition").notNullable();
    table.string("ageGroup").notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sickness");
};

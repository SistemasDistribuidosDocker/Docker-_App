/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .alterTable("Users", function (table) {
            table.string("Role", 255).notNullable();
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .alterTable("Users", function (table) {
            table.dropColumn("Role")
        })
};

exports.config = { transaction: false };
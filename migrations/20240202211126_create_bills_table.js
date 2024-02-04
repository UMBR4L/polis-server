/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.dropTableIfExists("bills").then(function () {
    return knex.schema.createTable("bills", function (table) {
      table.increments("id").primary();
      table.string("bill_ID"); // Rename to match seed data
      table.string("title", 1000); // Keep the same name as in seed data
      table.string("session_ID"); // Rename to match seed data
      table.date("introduced"); // Rename to match seed data
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bills");
};

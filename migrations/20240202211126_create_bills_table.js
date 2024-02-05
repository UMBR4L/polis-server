/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("BillDetails", function (table) {
    table.increments("id").primary();
    table.string("bill_ID"); // Rename to match seed data
    table.string("session_ID"); // Rename to match seed data
    table.string("title", 1000); // Keep the same name as in seed data
    table.date("introduced"); // Rename to match seed data
    table.text("intent"); // JSON content, so use text type
    table.text("proposed_changes"); // JSON content, so use text type
    table.text("pros"); // JSON content, so use text type
    table.text("cons"); // JSON content, so use text type
    table.text("progress"); // JSON content, so use text type
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("BillDetails");
};

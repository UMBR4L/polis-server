exports.up = function (knex) {
  return knex.schema.createTable("bills", function (table) {
    table.increments("id").primary();
    table.string("bill_ID").notNullable();
    table.string("title", 500).notNullable();
    table.string("session_ID").notNullable();
    table.date("introduced").notNullable();
    table.string("progress"); // Add a column for progress
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bills");
};

exports.up = knex => knex.schema.createTable('tasks', table => {
    table.increments("id");
    table.text("task").notNullable();
    table.integer("priority").notNullable();
    table.boolean("done").default(false)
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("tasks");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', table=> {
        table.increments('id');
        table.integer('users_id').notNullable();
        table.foreign('users_id').references('id').inTable('users');
        table.datetime('stamp').defaultTo(knex.fn.now());
        table.string('title',100);
        table.text('content');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('posts',table => {
        table.dropForeign('users_id')
    }).then(function (){
        return knex.schema.dropTableIfExists('posts');
    });
};

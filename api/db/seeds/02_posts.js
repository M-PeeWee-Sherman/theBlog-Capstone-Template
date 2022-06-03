/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    { users_id: '1',title:'alpha Intro',content:'alpha Intro Content'},
    { users_id: '1',title:'alpha follow-up',content:'alpha follow Content'},
    { users_id: '2',title:'bravo Intro',content:'bravo Intro Content'},
    { users_id: '2',title:'bravo follow-bravo',content:'bravo follow Content'},
    { users_id: '3',title:'gamma deviation',content:'gamma deviation deviation Content'},
  ]);
};

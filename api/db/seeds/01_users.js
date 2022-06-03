/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstname: 'alphaFirst', lastname: 'alphaLast',username:'alphaUser',password:'pw'},
    {id: 2, firstname: 'betaFirst', lastname: 'betaLast',username:'betaUser',password:'pw'},
    {id: 3, firstname: 'gammaFirst', lastname: 'gammaLast',username:'gammaUser',password:'pw'},
  ]);
};

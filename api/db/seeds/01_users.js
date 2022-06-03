/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('posts').del()
  // await knex('users').del()
  // await knex('users').insert([
  //   {id: 1, firstname: 'alphaFirst', lastname: 'alphaLast',username:'alphaUser',password:'6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e'},
  //   {id: 2, firstname: 'betaFirst', lastname: 'betaLast',username:'betaUser',password:'6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e'},
  //   {id: 3, firstname: 'gammaFirst', lastname: 'gammaLast',username:'gammaUser',password:'6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e'},
  // ]);
};

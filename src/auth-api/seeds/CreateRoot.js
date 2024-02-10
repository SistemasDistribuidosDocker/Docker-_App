const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const password = await bcrypt.hash('Root', 10);
  const secondPassword = await bcrypt.hash('Second', 10);
  const thirdPassword = await bcrypt.hash('Second', 10);

  await knex('Users').del()
  await knex('Users').insert([
    {
      id: 1,
      User: 'Root',
      Password: password,
      Role: 'Admin'
    },

  ]);
  await knex('Users').insert([
    {
      id: 2,
      User: 'Second User',
      Password: secondPassword,
      Role: 'Edit'
    },
  ]);
  await knex('Users').insert([
    {
      id: 3,
      User: 'Third User',
      Password: thirdPassword,
      Role: 'View'
    },
  ]);
};

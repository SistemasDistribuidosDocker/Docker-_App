// responsavel por guardar alguns users e escolas default na base de dados
//npx knex seed:run

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {

      // limpa a tabela de escolas
      await knex('nutri').del();

      // limpa a tabela de users
      await knex('users').del();

      // encripta as passwords
      const adminPassword = await bcrypt.hash('Admin', 10);
      const editPassword = await bcrypt.hash('Edit', 10);
      const viewPassword = await bcrypt.hash('View', 10);

      // guarda os users
      await knex('users').insert([
        { id: 1, user: 'Admin', email: 'admin@gmail.com', password: adminPassword, role: 'admin' },
        { id: 2, user: 'Edit', email: 'edit@gmail.com', password: editPassword, role: 'edit' },
        { id: 3, user: 'View', email: 'view@gmail.com', password: viewPassword, role: 'view' },
        { id: 4, user: 'Edit2', email: 'edit2@gmail.com', password: editPassword, role: 'edit' }
      ]);

      // guarda alguns dados para  atabela nutri
      await knex('nutri').insert([
        { id: 1, yearstart: 1880, yearend: 1986, locationabbr: 'US', user_id: 1 },
        { id: 2, yearstart: 1990, yearend: 1992, locationabbr: 'US', user_id: 2 },
        { id: 3, yearstart: 1992, yearend: 1994, locationabbr: 'US', user_id: 4 },
      ]);
    };
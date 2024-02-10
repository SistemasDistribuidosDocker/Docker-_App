// Update with your config settings.
require('dotenv').config()

const express = require('express');

const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var bodyParser = require('body-parser')

const app = express();
const port = 8080;

// parse application/json
app.use(bodyParser.json())

const database = knex({
    client: process.env.CLIENT,
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.USER_PASSWORD
    }
});

// Rota para obter dados do PostgreSQL
app.post('/api/login', async (req, res) => {
    try {
        const { user, password } = req.body;

        const users = await database.table('Users')
            .select('*')
            .where({
                User: user,
            })
            .first();

        if (!users) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        const newPassword = users.Password;
        const comparePassword = await bcrypt.compare(password, newPassword);
        if (!comparePassword) {
            res.status(404).json({ error: 'Credentials not found' })
            return
        }
        var token = jwt.sign({ user: users.User, id: users.id, role: users.Role }, 'shhhhh');
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/create_user', async (req, res) => {
    const resu = req.headers['authorization'];
    if (!resu) {
        res.status(401).json({ error: 'Not found' })
        return
    }
    const token = resu.replace("Bearer ", "");
    var decoded = jwt.verify(token, 'shhhhh');
    const decodedUser = await database.table('Users')
        .select('*')
        .where({
            User: decoded.user,
        })
        .first();

    if (!decodedUser) {
        res.status(401).json({ error: 'Not authorized' })
        return
    }

    if (decodedUser.Role !== 'Admin') {
        res.status(401).json({ error: 'Not authorized' })
        return
    }

    const { user, password, role } = req.body;
    try {
        const newPassword = await bcrypt.hash(password, 10);
        await database.table('Users').insert({ User: user, Password: newPassword, Role: role });

        const users = await database.table('Users').where({ User: user, Password: newPassword, Role: role });
        res.status(201).json({ id: users[0].id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/edit_user/:id', async (req, res) => {
    const id = req.params.id;
    const resu = req.headers['authorization'];
    if (!resu) {
        res.status(401).json({ error: 'Not found' })
        return
    }
    const token = resu.replace("Bearer ", "");
    var decoded = jwt.verify(token, 'shhhhh');
    const decodedUser = await database.table('Users')
        .select('*')
        .where({
            User: decoded.user,
        })
        .first();

    if (!decodedUser) {
        res.status(401).json({ error: 'Not authorized' })
        return
    }

    if (decodedUser.Role !== 'Admin') {
        res.status(401).json({ error: 'Not authorized' })
        return
    }

    const { user, password, role } = req.body;
    try {
        const newPassword = await bcrypt.hash(password, 10);
        await database.table('Users').where({ id: id }).update({ User: user, Password: newPassword, Role: role });
        res.status(201).json({ message: 'User Deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/delete_user/:id', async (req, res) => {
    const id = req.params.id;
    const resu = req.headers['authorization'];
    if (!resu) {
        res.status(401).json({ error: 'Not found' })
        return
    }
    const token = resu.replace("Bearer ", "");
    var decoded = jwt.verify(token, 'shhhhh');
    const decodedUser = await database.table('Users')
        .select('*')
        .where({
            User: decoded.user,
        })
        .first();

    if (!decodedUser) {
        res.status(401).json({ error: 'Not authorized' })
        return
    }

    if (decodedUser.Role !== 'Admin') {
        res.status(401).json({ error: 'Not authorized' })
        return
    }


    try {
        await database.table('Users').where({ id: id }).delete();
        res.status(201).json({ message: 'User Deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/verify_token', async (req, res) => {
    try {
        const resu = req.headers['authorization'];
        if (!resu) {
            res.status(401).json({ error: 'Not found' })
            return
        }
        const token = resu.replace("Bearer ", "");
        var decoded = jwt.verify(token, 'shhhhh');

        const users = await database.table('Users')
            .select('*')
            .where({
                User: decoded.user,
            })
            .first();

        if (!users) {
            res.status(401).json({ error: 'Not found' })
            return
        }
        res.json({ user: users.User, id: users.id, role: users.Role });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });

    }
});
const server = app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});

module.exports = {
    app,
    server,
    database
}
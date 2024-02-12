const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const db = knex(require('./knexfile'));

//middleware de autenticação
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  console.log("Token recebido:", token);

  jwt.verify(token, "segredo", (err, decodedToken) => {
    if (err) {
      console.error("Erro ao verificar o token:", err);
      return res.status(401).json({ message: 'Token de autenticação inválido', token: token });
    }

    console.log("Token decodificado:", decodedToken);

    // Verifica se o token decodificado contém o campo userId
    if (!decodedToken.userId) {
      return res.status(401).json({ message: 'Token de autenticação inválido - ID do usuário não encontrado' });
    }

    // Atribui o ID do usuário ao objeto req.user
    req.user = {
      id: decodedToken.userId
    };

    next();
  });
};

// Rota de registro
app.post('/register', async (req, res) => {
    const { user, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    try {
      // verifica se o email é valido com o validator
      if (!isEmail(email)) {
        return res.status(400).json({ message: 'Por favor, insira um email válido' });
      }
  
      // verifica se o email ja existe na base de dados
      const existingUser = await db('users').where('email', email).first();
      if (existingUser) {
        return res.status(400).json({ message: 'Este email já está registrado' });
      }
  
      await db('users').insert({ user, email, password: hashedPassword });
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
  });

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    console.log(user)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, "segredo", { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Rota para editar senha e nome de usuário do usuário
app.put('/user/editar', authenticateUser, async (req, res) => {
  const userId = req.user.id; // ID do usuário logado
  const { user, password } = req.body;

  try {
    // Verifica se o usuário que está tentando editar é o mesmo que está logado
    const existingUser = await db('users').where({ id: userId }).first();
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza o nome de usuário se fornecido
    if (user) existingUser.user = user;
    
    // Atualiza a senha se fornecida
    if (password) {
      // Hash da nova senha
      existingUser.password = await bcrypt.hash(password, 10);
    }

    // Atualiza os dados do usuário no banco de dados
    await db('users').where({ id: userId }).update(existingUser);

    res.status(200).json({ message: 'Dados do usuário atualizados com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar dados do usuário', error: error.message });
  }
});


//rota para eliminar utilizadores
app.get('/user/eliminar/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Consulta ao banco de dados para buscar os dados do usuário com o ID fornecido
        const user = await db('users').where({ id: userId }).first();

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
    }
});

app.post('/nutri/adicionar', authenticateUser, async (req, res) => {
    const { yearstart, yearend, locationabbr} = req.body;
    const userId = req.user.id; // ID do usuário logado
    try {
      // Inserir dados da escola no banco de dados
      const nutriId = await db('nutri').insert({
        yearstart, 
        yearend, 
        locationabbr,
        user_id: userId // Relaciona a Nutri ao usuário que a adicionou
      });
  
      res.status(201).json({ message: 'Nutri adicionada com sucesso', escolaId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar escola', error: error.message });
    }
  });

  // Rota para editar informações da escola
  app.put('/nutri/editar/:id', authenticateUser, async (req, res) => {
    const escolaId = req.params.id; // ID da escola a ser editada
    const userId = req.user.id; // ID do usuário logado
    const { nome, responsavel, contacto, morada } = req.body;
  
    try {
      // Verifica se a escola existe no banco de dados e pertence ao usuário logado
      const existingEscola = await db('nutri').where({ id: escolaId, user_id: userId }).first();
      if (!existingEscola) {
        return res.status(404).json({ error: 'Escola não encontrada ou não pertence ao usuário' });
      }
  
      // Atualiza os dados da escola
      await db('nutri').where({ id: nutriId }).update({
        nome,
        responsavel,
        contacto,
        morada
      });
  
      res.status(200).json({ message: 'Informações da escola atualizadas com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar informações da escola', error: error.message });
    }
  });

  // Rota para eliminar escola
app.delete('/nutri/eliminar/:id', authenticateUser, async (req, res) => {
  const escolaId = req.params.id; // ID da escola a ser eliminada
  const userId = req.user.id; // ID do usuário logado

  try {
    // Verifica se a escola existe no banco de dados e pertence ao usuário logado
    const existingEscola = await db('escolas').where({ id: escolaId, user_id: userId }).first();
    if (!existingEscola) {
      return res.status(404).json({ error: 'Escola não encontrada ou não pertence ao usuário' });
    }

    // Elimina a escola do banco de dados
    await db('escolas').where({ id: escolaId }).del();

    res.status(200).json({ message: 'Escola eliminada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao eliminar escola', error: error.message });
  }
});
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

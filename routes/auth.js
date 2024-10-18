const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const router = express.Router();

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'site_admin'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Página de login
router.get('/login', (req, res) => {
  if (req.session.loggedin) {
    return res.redirect('/dashboard'); // Redireciona para o dashboard se já estiver logado
  }
  res.render('login'); // Renderiza a página de login com EJS
});

// Autenticar o login
router.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // Query para verificar o usuário no banco de dados
  const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      res.status(500).send('Erro no servidor');
    } else if (results.length > 0) {
      // Se o login for bem-sucedido
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/dashboard'); // Redireciona para o dashboard
    } else {
      // Se as credenciais forem inválidas
      res.render('login', { message: 'Usuário ou senha incorretos!' });  // Exibe a mensagem de erro
    }
  });
});

// Página após o login (dashboard)
router.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.render('dashboard', { username: req.session.username }); // Renderiza a página do dashboard
  } else {
    res.redirect('/login'); // Redireciona para a página de login se não estiver autenticado
  }
});

// Rota para logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/login'); // Redireciona para a página de login após logout
  });
});

module.exports = router;
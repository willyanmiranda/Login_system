const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
require('dotenv').config();

// Configurar a engine de template EJS
app.set('view engine', 'ejs');

// Configurar a pasta 'views' para os arquivos .ejs
app.set('views', path.join(__dirname, 'public/html'));

// Configurar a pasta 'public' para servir os arquivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o body-parser
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Importar as rotas de autenticação
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Rota principal
app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard'); // Redireciona para o dashboard se estiver logado
  } else {
    res.redirect('/login'); // Caso contrário, redireciona para o login
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000.');
});
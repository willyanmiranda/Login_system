const bcrypt = require('bcrypt');
const db = require('../db/dbConnection');

exports.loginPage = (req, res) => {
  if (req.session.loggedin) {
    return res.redirect('/dashboard');
  }
  res.render('login');
};

exports.authenticate = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM admins WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      return res.status(500).send('Erro no servidor');
    }
    if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        req.session.loggedin = true;
        req.session.username = username;
        return res.redirect('/dashboard');
      }
    }
    res.render('login', { message: 'Usuário ou senha incorretos!' });
  });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao inserir o usuário no banco de dados:', err);
        return res.status(500).send('Erro ao cadastrar o usuário.');
      }
      res.status(201).send('Usuário cadastrado com sucesso!');
    });
  } catch (err) {
    console.error('Erro ao cadastrar o usuário:', err);
    res.status(500).send('Erro no servidor.');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
};

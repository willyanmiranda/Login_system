const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.authenticate = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.loggedin = true;
        req.session.username = username;
        res.status(201).send('Login feito com sucesso!');
      }
    }
    res.status(500).send('Usuário ou senha incorretos!');
  } catch (err) {
    console.error('Erro ao autenticar o usuário:', err);
    res.status(500).send('Erro no servidor');
  }
};

exports.register = async (req, res) => {
  const {
    name, username, email, password, role, phone_number, 
    profile_picture_url, birth_date, address, preferences, 
    social_login_provider
  } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send('Por favor, preencha os campos obrigatórios.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || 'user', 
      phone_number,
      profile_picture_url,
      birth_date: birth_date ? new Date(birth_date) : null,
      address,
      preferences,
      social_login_provider,
      is_active: true,
      is_verified: false,
      failed_login_attempts: 0
    });

    res.status(201).send('Usuário cadastrado com sucesso!');
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
  });
};
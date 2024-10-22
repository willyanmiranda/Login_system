const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.session.username } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (err) {
    console.error('Erro ao buscar o perfil do usuário:', err);
    res.status(500).send('Erro no servidor.');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (err) {
    console.error('Erro ao buscar o perfil do usuário:', err);
    res.status(500).send('Erro no servidor.');
  }
};
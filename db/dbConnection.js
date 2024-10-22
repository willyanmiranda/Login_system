const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', 
  logging: false, 
  pool: {
    max: 5,      
    min: 0,       
    acquire: 30000, 
    idle: 10000,  
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados via Sequelize.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
});

module.exports = sequelize;
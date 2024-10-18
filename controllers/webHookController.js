const { exec } = require('child_process');

exports.updateWebhook = (req, res) => {
    exec('git pull origin main', { cwd: '~/htdocs/node.rifashow.shop/Login_system' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro: ${error.message}`);
        return res.status(500).send('Erro ao atualizar o código');
      }
      if (stderr) {
        console.error(`Erro: ${stderr}`);
        return res.status(500).send('Erro ao atualizar o código');
      }
      console.log(`Saída: ${stdout}`);
      res.status(200).send('Código atualizado com sucesso');
    });
};
const Product = require('../models/product.model');

exports.register = async (req, res) => {
    const {
      name, description, price, sku, category_id, stock_quantity, 
      image_url, status, brand, discount, weight, dimensions, is_featured
    } = req.body;
  
    if (!name || !price) {
      return res.status(400).send('Por favor, preencha os campos obrigatórios.');
    }
  
    try { 
      const newProduct = await Product.create({
        name, 
        description, 
        price, 
        sku, 
        category_id, 
        stock_quantity, 
        image_url, 
        status, 
        brand, 
        discount, 
        weight, 
        dimensions, 
        is_featured
      });
  
      res.status(201).send('Produto cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar o produto:', err);
      res.status(500).send('Erro no servidor.');
    }
};
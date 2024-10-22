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

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Produto não encontrado.');
    }
  } catch (err) {
    console.error('Erro ao buscar o produto:', err);
    res.status(500).send('Erro no servidor.');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products) {
      res.json(products);
    } else {
      res.status(404).send('Nenhum produto encontrado.');
    }
  } catch (err) {
    console.error('Erro ao buscar os produtos:', err);
    res.status(500).send('Erro no servidor.');
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        category_id: req.params.id,
      },
    });;
    if (products) {
      res.json(products);
    } else {
      res.status(404).send('Nenhum produto encontrado.');
    }
  } catch (err) {
    console.error('Erro ao buscar os produtos:', err);
    res.status(500).send('Erro no servidor.');
  }
};
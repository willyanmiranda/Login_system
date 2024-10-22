const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/product/register', productController.register);
router.get('/product/:id', productController.getProductById);
router.get('/products/category/:id', productController.getProductsByCategory);
router.get('/products', productController.getProducts);

module.exports = router;
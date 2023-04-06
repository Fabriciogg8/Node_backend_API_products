const express = require("express");

const router = express.Router();

const ProductsService = require('../services/product.service')
// Instance of the Product Service class, which we import from the service script
const service = new ProductsService()

const validatorHandler = require('../middlewares/validator.hadler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schema/product.schema')

/* Products rout*/
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});


router.get('/filter', (req, res) => {
  res.send("Este es un endpoint especifico")
})


/* Endpoint with dinamic id */
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const product = await service.findOne(id);
      res.json(product);
    } catch(error){
      next(error);
    }
  }
);


/*/// POST ///*/
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
})


/*/// PATCH ///*/
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
    next(error)
    }
})


/*/// DELETE ///*/
router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await service.delete(id)
  res.json(product)
})

module.exports = router;




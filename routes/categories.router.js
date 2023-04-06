const express = require("express");
const faker = require("faker")

const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params
  console.log(req.params)
  res.json([{
    categoryId,
    productId,
    price: 440
  }])
})


module.exports = router;

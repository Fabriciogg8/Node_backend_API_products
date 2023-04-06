const faker = require("faker")
const boom = require("@hapi/boom")

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  // This method generates the data
  async generate(){
    // const limit = size || 8; // de esta forma indicamos que vale size ó 8 por defecto
    const limit = 100;
    for (let i = 0; i < limit; i++) {
    this.products.push({
      id : faker.datatype.uuid(),
      name : faker.commerce.productName(),
      price : parseInt(faker.commerce.price(), 10),
      image : faker.image.imageUrl(),
      isBlock: faker.datatype.boolean(),
      })
    }
  }

  // Create a new product
  async create(data) {
    const newProduct = {
      id : faker.datatype.uuid(),
      ...data //spread operator
    }
    this.products.push(newProduct)
    return newProduct
  }

  // Search for all the products
  // In this method we are simulting that we need to wait for the response
  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000)
    });
  }

  // Search a product in particular
  async findOne(id){
    //const name = this.getTotal(); // Esto lo agregamos para obtener un error y probar los middlewares.
    const product = this.products.find(item => item.id === id);
    if (!product){
      throw boom.notFound('Product not found!');
    } if (product.isBlock) {
      throw boom.conflict('Product is blocked!')
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    // Si findIndex no encuentra el elemento devuelve un -1
    if (index === -1){
      throw boom.notFound('product not found');
    }
    // We save the data we had in a variable
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;

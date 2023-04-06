const express = require("express");
const cors = require('cors');
const routerApi = require("./routes")

const { logErrors, errorHandler, boomErorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:5500', 'https://myapp-con-node.com']
const options = {
  origin : (origin, callback) => {
    if (whitelist.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error('Dominio no permitido'))
    }
  }
}
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send("Hola que tal, primer ruta con NODE y Express")
})


app.listen(port, () => {
  console.log('My port ' + port);
})


routerApi(app)

app.use(logErrors);
app.use(boomErorHandler)
app.use(errorHandler);

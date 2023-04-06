const express = require("express");
const routerApi = require("./routes")

const { logErrors, errorHandler, boomErorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hola que tal, primer ruta con NODE y Express")
})


app.listen(port, () => {
  console.log('My port ' + port);
})


routerApi(app)

app.use(logErrors);
app.use(boomErorHandler)
app.use(errorHandler);

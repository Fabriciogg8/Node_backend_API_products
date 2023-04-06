# Backend con Node - API REST con Express.js

<a name="top"></a>

## [English](#item1)
## [Spanish](#item2)

<a name="item1"></a>

## English
 
## Used technology: Node

## Abstract

We will use Express.js to create a virtual store project with products, categories, etc.

What is Express.js?
It is a microframework that runs on Node.

## **Initial configuration**
We start with npm init, git init, and then create the .gitignore, .editorconfig, and .eslintrc.json files. These last two are configuration files.

We also create the index.js file.

**gitignore**: we will use the website gitignore.io, which allows us to choose the environment, in this case, NODE, and also select the operating systems (Windows, Linux, macOS) that should not be tracked.

**editorconfig**: this file is recommended so that all developers have the same editor configuration. To use the plugin, we install the EditorConfig for VS Code extension in VSC. We have a given configuration that we will use so that everyone can work in the same way. We copy it into this file.

**.eslintrc.json**: this file is used to configure linters or code formatting for good practices. As in the previous case, we are given a configuration to work with the same format.

**package.json**: we will modify it by adding some scripts. We add dev, which we will use to start a development environment, which we will do with -nodemon index.js-. We also add start with -node index.js-. We can also run our linter, which ensures that we follow good practices -eslint-.

To make all this work, we need to install some development dependencies:

```bash
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D 
```
To test that **nodemon** is running, we use the command that we had added in package.json:

```bash
npm run dev
```
Then to run in **production mode**, we use:

```bash
npm run start
```

## **Installation of Express.js and first HTTP server** 

We will install Express.js from the terminal as a production dependency, which is different from development dependencies.

```bash
npm i express
```
If we go to package.json, we can see that the express dependency was created.

Next, we start working with the **index.js** file. First, we create a constant where we require Express. We create an application by calling the express() method or constructor. Then, we specify the port number where we want the application to run.

We then define a route using the get('/') method. Inside the get() method, we have a callback, which will be the response we send to our clients. Inside the callback, we have two parameters, the request and the response. We send the desired response message in the response object.

We also need to specify that the application listens on the designated port. We can also use a callback to send a console.log when it is running. To test it, we run **npm run dev**. If we go to http://127.0.0.1:3000/ in our browser, we see the response message we had placed in the response.

## **Routing with Express.js**

We can start creating the routes that we want by using get('/path') to send the messages we want. In the previous example, we used send to send a string message, but generally, we use json with res.json({}).

The route definition has the following structure:

**app.METHOD(PATH, HANDLER)**

Where:

- app is an instance of Express.
- METHOD is an HTTP request method.
- PATH is a server access path.
- HANDLER is the function that runs when the route is matched.

## **RESTful API**
REST: Representational State Transfer
It is a convention that refers to web services through the HTTP protocol.

**Methods:**

* Get: Obtain
* Put: Modify (modifies the previous data to the new one, eliminating the data that was not passed)
* Patch: Update (updates only what is sent, without modifying what was not sent)
* Post: Create
* Delete: Remove

## **GET: Receive parameters**

One of the conventions of REST is that when we have an endpoint, we can define the entity and then the ID. For example, if we have tasks, the endpoint would be api.example.com/tasks/{id}/, and we would get that specific task.

We can create a new route in which we request the ID. We should know that within the request, we have a property called params, which sends us all the parameters in an object. We can use destructuring to extract the necessary parameter by using const {id} = req.params. If we save that constant within the object we are returning, we can return that value in the HTML.

Then we can do the same with two parameters. For this, we must note that within the same endpoint, we cannot have the same name for two parameters, that is, if we have categories/:id/products/:product, we cannot repeat id in both cases.

## **GET: Query Parameters** 

To perform specific behaviors in requests, we often use query parameters indicated in the URL as ?parameterName=value and &&parameterName2=value2. We use them for pagination, to limit the amount of data returned to the user, etc.

As the parameters are optional, they will not be defined directly in the route. Instead, they come as parameters within our request. We can obtain these parameters from the query property of the request.

As the parameters are optional, we use an if statement to check if the user used them.

We can install a library that generates fake data:

```bash
npm i faker@5.5.3 -S
```
Or alternatively:

```bash
npm i @faker-js/faker
```
With this latest version, to use it, we need to require it in the following way:

```javascript
const { faker } = require('@faker-js/faker');
```
After installing it, we can import it into the index file, and we can create fake data to improve our queries. To add data to our product query, we can use a for loop with the desired iteration value (number of data). For each iteration, we push the data into an array called products, where we add the name, the price (in base 10), and an image.

After having the data, we can do different queries, for example, ?size=8. In the route creation, we can tell it that if the query parameter with the number of products does not come, by default, it will send 8.

To avoid problems with routes, we must place everything that is specific before what is dynamic. This means that if we have a route /filter, it will go before in the code than a route /:id. Otherwise, filter will be taken as a parameter, and therefore it will never enter that endpoint. 

## **Separation of Concerns with express.Router** 

This means that each piece of code should have a **single responsibility**. So far we have been doing all the routing in a single file, so we are not complying with this principle.

The first step is to create a folder called **routes**. Then we create the product routes file, where we usually sign them, that is, we give them a camelcase or dot notation name that specifies what they refer to. In this case, we use **products.route.js.**

We move the product routes to this new file. We must also import express and faker. As we will not have access to the application, we create a router.

```javascript
const router = express.Router()
```
This line of code is used to define an instance of router to handle routes in a web application.

A **router** is a kind of mini application that only handles routes and middleware, and can be used to organize and modularize a larger web application.

Therefore, router is an object that allows us to define the routes for our application, and associate them with the corresponding functions that will be executed when they are accessed.

We must also know that since we are in the product routes file, it is not necessary to include the name in the routes.

At the end of the file, we indicate that we want to export the router using:

```javascript
module.exports = router
```

We create another file called index.js, which will have the product route since in the previous file we were only placing the details. Here we will receive the **app** as a parameter for a function. The function will handle the detail that comes from the client. Finally, we export the function.

Then we do the same for users, creating the **users.router.js** file.

In the main index file (which is not in the routes folder, but at the beginning of our application), we must import the routes folder, where it is not necessary to include index.js as it is automatically handled by the system.

## **POST: method for creating**

Before starting with POST, it is important to know that generally routes begin with a versioning. Therefore, we have to place a master route that will control the versions, and from which all will start =>

```javascript
app.use('/api/v1', router);
```

As we are going to perform a POST, we must have a tool that emulates the sending, in this case I am going to use **Thunder Client**, but POSTMAN or Insomia can be used.

Inside the products.router.js file, we create the route for the POST method. We create a constant **"body"** that will be responsible for receiving all the values.

We must create a **middleware** to be able to receive the values that are sent to us as JSON

```javascript
app.use(express.json());
```
This is placed in the main index file.

## **PUT, PATCH and DELETE** 

If we are going to update values with **PUT**, we must send a unique identifier for that product in the route. But at the same time, we must bear in mind that in these cases it is also necessary to pass all fields, even if we only want to modify one. As an example, we can think that we want to modify the price, but if we do it with PUT we must pass name, detail, image, etc.

For partial updates we use **PATCH**, which allows us to change only the desired field through the product identifier in this case. The route for PATCH is very similar to the route for POST.

For **DELETE** we also have a similar behavior, receiving an id, but in this case it will not have a body.

## **HTTP response status codes** 

HTTP response status codes allow the client to know, as the name suggests, the status of the request made, so that they can determine whether a request has been completed successfully, had errors, or presented some issues during the process.

So far, all our routes have returned the status code 200, but if we use POST to create a product, it should return 201. The way to add it is in the response we make to the client =>

```js
res.status(201).json({ message: "Created successfully" ..
```

When we are asked for a product that is not on the list, we can send a 404. We do this in the GET route, through a conditional statement. We must remember that all parameters come as a string, so we must write it that way in the conditional.

### **Introduction to services: creating first service**

So far we have only worked on routing, but now we will see the business logic, which is where the services are. This comes from an architecture, which is defined by layers. The smallest layer is **entities**, then **use cases** (services) where everything related to business logic is. Above that are the **controllers**, which provide access, where we find all the routing and middlewares.

To separate the services, which is the business logic, from the routing, we start by creating a folder called services. Then we create a file inside it for products. We are going to start using object-oriented programming, we need to manage everything that is related to products, that is, create, edit, etc.

We create the **ProductsService** class where we are going to place all the functions that refer to the different services (business logic). For now, we are going to work with in-memory data, we will not connect it to a database, it is just to understand the logic. That is why we are going to create a method that allows us to generate data from faker. Every time we generate an instance of the product, it will generate 100 data, since we built the method with that value.

For the find method, the return is very simple, as it returns all the values. We can test it by importing that productsService in the router. After importing it, we create an instance. Inside the route, we can use the instance to call the desired method =>

```js
const products = service.find();
```

To find a specific product we can do the same, but keeping in mind that we are looking for it by an id, and in this case our fake database did not have an id, so we must add it.

### **Creating, Editing, and Deleting from the Service**

We are using a type of in-memory database persistence, which means that if we close the terminal and run the program again, the data we had will not exist. They only exist if we keep the program running.

For **create**, we have to create an ID with faker, but for the other fields, the client will provide them. We use the spread operator to concatenate the values received from the client. The **spread syntax** or **spread operator** in JavaScript (…) allows us to quickly copy all or part of an existing array or object into another array or object.

js
Copy code
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
After having the new product, we push it to add it to the array of products. Finally, we return the created product. Then in the router, we receive the data from the client, use the method to create a new product, and respond with that created product.

For **editing** or **updating**, the first thing is to find the index of the product we want to update and then with a conditional ask if the index exists (findIndex returns -1 if the index is not found). In this case, we also use the **spread operator** to concatenate the values we had from the product with the new ones. These values we pass will overwrite the values of the object where the key is the same. In other cases, or if we don't send the key, the values won't change.

With **delete**, the logic is quite similar to update, as we first need to find which product we want to delete. Then we use the **splice** method of arrays to remove that product from our array.

### **Async Await and Error Handling**

In this case, as we are working with an in-memory array, the process is synchronous, meaning we don't need to wait for any process to receive the result. In reality, this should be an asynchronous process, as that is how services work.

We need to add **async** to each of the methods. This way, NODE will treat them asynchronously as a promise. We must also remember to use **await.**

In the routers, we also need to add **async** and **await.**

Let's simulate a delay when we get the products. To do this, we go to the find method in services and add a promise. We set a waiting time of 5 seconds to return the information.

When we handle everything asynchronously, it allows us to handle errors with **try-catch.** When we updated the information, if the ID was not found, it would throw an error. Now we can use **try-catch**, where we try to find the ID and respond with a JSON, but if there is an error in any of the lines, we catch it and respond with an error message.

### **Middlewares**

These are located between the request and the response, where they allow us to process logic REQUEST --> MIDDLEWARE --> RESPONSE. They can be used globally, for example by capturing all the errors in our application, or uniquely for each endpoint. They can work sequentially, meaning we can have multiple middlewares one after another REQUEST --> MIDDLEWARE --> MIDDLEWARE --> MIDDLEWARE --> RESPONSE. For example, the first middleware could check if we have authentication logic, then in the second middleware we make another check, and so on, as needed. Therefore, a middleware may block at some point, as a middleware that validates permissions, if the correct ones are not sent, does not allow to continue to the next middleware.

The logic is within our function that has a request and response as parameters, we also add a next. This is the one that allows us to continue.

Example:

```js
function (req, res, next) {
  if(something) {
    res.send('end')
  } else {
    next();
  }
}
```
There are also error-type middlewares, where the first parameter for the function is the error.
Example:

```js
function (error, req, res, next) {
  if(error) {
    res.status(500).json({error}); 
  } else {
    next();
  }
}
``` 

Use cases:

* They work like pipes: the output of one is the input of another.
* Validate data.
* Capture errors.
* Validate permissions.
* Control access.

### **Middleware for HttpErrors** 

We are going to implement an error middleware (global, for the whole application). We are going to create a folder just for middlewares, and inside this folder we create a file for the error handler.

We build a function **logError** where we send the error, request, response, and next as parameters. In this case, we only print the error in the console, and then show the error on the server so that we can monitor it **next(err)**;. It's important to know that we are running it as an error middleware, if we don't send anything then we execute it as a normal one.

Then we will create another function **errorHandler**, which will detect an error, but we will create a format to be able to return it to our client. This changes that we don't want to continue to our next middleware, if there is an error that should be the point where it ends. So, if there is an error, we send the response with a status 500. We also send a json with the error message and include a property called **stack**. This property contains a string that describes the stack trace of function calls that were in progress when the error exception occurred. This information is useful for debugging errors as it can help identify the source of the error and the functions involved in the process. However, this information should not be publicly exposed in a production application as it can be maliciously used to find vulnerabilities in the system.

We must remember that even if we are not using the next, we must include it since it is the way it detects that it is an error middleware. Therefore, we must include the 4 parameters in the function.

We should place the error middleware after defining the routing in the application's index. So, after importing them with require, we add the following:

```js
app.use(logErrors);
app.use(errorHandler);
```

Take into consideration in which order they are being executed, that is, in the order in which we place them in the lines above, will be the order in which they will be executed.

We must explicitly catch the error from the routing and then execute the error middleware. Therefore, in the get product routing, we add next in the parameters of the asynchronous function. So, we place a try-catch block, where we explicitly place in the catch, that if there is an error, we execute the error middleware, with the next. We intentionally place a function that does not exist getTotal, to generate an error in the findOne method of products.

When trying to get a product from Thunder Client, we get the following error message:

```bash
{
  "message": "this.getTotal is not a function",
  "stack": "TypeError: this.getTotal is not a function\n...
``` 

### **Error handling with Boom**

We install the Boom library with the following command:

```bash
npm i @hapi/boom
```
We require it in the product services. Now we will be able to handle errors in a friendlier way. In every place where we have an error, we can return the corresponding status code with the methods that this library provides. We can also send the messages we want.

Boom has a special format for error handling. Therefore, we can create a middleware that is specific to the Boom library. When creating this middleware, we use a property that is created when the error is of type Boom (isBoom). We add to the middleware that if the error is not of type Boom, it should execute a normal error middleware.

After adding this middleware to the index, we can search for a product that does not exist to test if it throws a 404 error.

We can also create a new error by imagining that there are products that cannot be viewed. Therefore, we will add a property to the method that generates products that indicates if the product is blocked or not. This will be a boolean, which will return true or false. Then, when we search for a product, we can add an if statement that asks if it is blocked. If it is true, we send a Boom error of type conflict.

Therefore, if we use Thunder Client to bring all the products, we can see which ones have the blocked property. And if we want to search for one that is true, the error we created will appear.

### **Data validation with Joi**

Another use case for middlewares is to validate the data sent by clients, such as dates, URLs, and ensuring that when creating a product, all data is sent, etc.

To do this, we will install the Joi library with the following command:

```bash
npm i joi
```

We will create a folder where we will place the **schemas** (also known as DTO = data transfer object), which are the checks for our objects (products, etc.). Each schema will have, for each of its fields, the checks that we want. We can create a schema for creating the object, for updating it, for when we make a GET request.

To use them, we will create a middleware to which we can send our schemas to check the fields. Therefore, we create a new file called validator.handler in the middleware folder. Inside, we create the function to validate the schemas, which receives the schema and the property as parameters. Here, a middleware is created dynamically (using closure). If the schema is received, we validate the information we want to validate with schema.validate(). The information comes from data, which comes from a request (body, params, query). If there is an error (it does not comply with the validation), then a Boom error is sent. If there is no error, the service continues (next()).

### **Try out our endpoints** 

We are going to use the validations we created in our endpoints. The validations we created are middleware, and we can concatenate as many as we want. Therefore, before fetching a product, we are going to place the validatorHandler middleware. In this case, since it is for getting a product, we must pass the getProductSchema as a parameter. The second parameter is where the information is coming from, in this case, it is from the params.

In the case of an endpoint like patch, we can add more validators, for example, to first validate that we are trying to get an existing product, and then validate that the parameters we are passing in the body to modify are correct.

So far, when we create a product and have multiple errors, it sends us the first error it finds. That is, if we have the name and price wrong, it sends us that the name is wrong, and only after correcting it, it tells us that the price is wrong. This can be annoying. We can modify this behavior and have it send us all error messages from the beginning. We add to the validatorHandler that the **abortEarly** parameter is false.

### **List of most popular middlewares with Express**

Here is a list of the most popular middlewares in Express:

**CORS**

Middleware to enable CORS (Cross-origin resource sharing) in our routes or application. http://expressjs.com/en/resources/middleware/cors.html

**Morg**an

An HTTP request logger for Node.js. http://expressjs.com/en/resources/middleware/morgan.html

**Helmet**

Helmet helps us protect our Express applications by setting various HTTP headers. It's not a silver bullet, but it can help! https://github.com/helmetjs/helmet

**Express Debug**

Allows us to debug our Express applications using a toolbar on the page when we are developing them. https://github.com/devoidfury/express-debug

**Express Slash**

This middleware allows us to avoid worrying about writing routes with or without a trailing slash. https://github.com/ericf/express-slash

**Passport**

Passport is middleware that allows us to set up different authentication strategies for our applications. https://github.com/jaredhanson/passport

You can find more popular middlewares at the following link: http://expressjs.com/en/resources/middleware.html

### **Considerations for production**

CORS (Cross-Origin Resource Sharing) is a mechanism that allows web browsers and other web clients to access resources from a server that is located on a different origin than the origin from which the original resource was requested. Modern browsers implement security measures to prevent HTTP requests from a different origin than the original resource, unless the server from which the resource is requested explicitly specifies that it allows the request.

To allow web clients to access resources from a different origin, the server can send CORS headers in its HTTP response. These headers specify which origins can access the resources and what types of HTTP requests are allowed. The server can also specify other details of the CORS policy, such as the maximum duration of preflight requests and the authentication credentials allowed in requests.

In summary, CORS is a mechanism that allows web browsers and other web clients to access resources from a server that is located on a different origin than the origin from which the original resource was requested, as long as the server explicitly allows access by sending appropriate CORS headers.

### **CORS issue**
To enable CORS on all requests in Express, the cors middleware can be used. This middleware allows CORS to be configured and enabled on all server routes.

To use the cors middleware in Express, the cors package must first be installed:

```bash
npm install cors
```
Then, the middleware can be added to the main application file:

```js
const cors = require('cors');
```

app.use(cors());
In this way, CORS will be enabled on all application routes and access will be allowed from any origin. This may or may not be advisable.

If access restriction is desired, an array called a whitelist can be created, which contains the domains that will be allowed. These can be placed in a constant called options, which will be passed as a parameter to cors.

[Go up](#top)

<a name="item2"></a>

## Spanish
 
## Tecnologías utilizadas: Node

## Resumen

Utilizando Express.js haremos un proyecto de una tienda virtual, con productos, categorías, etc. 
**¿Qué es Express.js?** 
Es un microframework que corre en Node. 

## **Configuración inicial**

Comenzamos con npm init, git init y luego creamos los archivos .gitignore, .editorconfig y .eslintrc.json. Estos dos últimos son archivos de configuración. 

También dejamos creado el archivo index.js. 
 
**gitignore:** vamos a utilizar la página gitignore.io, la cual nos permitirá elegir cual es el entorno, en este caso NODE, y también podemos elegir los sistemas operativos (Windows, Linux, macOS) para que no se rastreen. 

**editorconfig:** este archivo es recomendado para que todos los desarrolladores, tengan una misma configuración del editor. Para que el plugin funcione instalamos la extension para VSC llamada **EditorConfig for VS Code**. Tenemos una configuración dada, que la vamos a utilizar para que todos podamos trabajar de la misma manera. La copiamos en este archivo.  

**.eslintrc.json:** este archivo sirve para configurar los linters o formato de código para buenas prácticas. El cual se nos da, como en el caso anterior, para trabajar todos en un mismo formato.  

**package.json:** vamos a modificarlo, agregando algunos scripts. Agregamos dev, el cual lo usaremos para levantar un entorno de desarrollo, el cual lo haremos con -nodemon index.js-. También start con -node index.js-. También podemos correr nuestro linter el cual se asegura que seguimos buenas prácticas -eslint-.  

Para que todo esto funcione, necesitamos instalar algunas dependencias de desarrollo: 
```bash 
npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D 
```

Para probar que se corre **nodemon** utilizamos el comando que habiamos agregado en package.json
```bash 
npm run dev
``` 
Luego para correr en **modo producción** utilizamos 
```bash 
npm run start
``` 

## **Instalación de Express.js y primer servidor HTTP**

Vamos a instalar express desde la terminal, como una dependencia de producción, siendo diferente a las de desarrollo
```bash
npm i express
```

Si vamos a package.json vemos que se nos creo la dependencia de express.  

Comenzamos a trabajar con el archivo **index.js**. Lo primero es crear una constante donde hacemos el require de express. Vamos a crear una aplicación. La forma de hacerlo es crear una constante con el metodo o constructor express. Luego podemos decirle a la aplicación en que puerto queremos que corra. 

Luego definimos una ruta, donde utilizamos get('/'). Dentro de get tenemos un callback, el cual será la respuesta que enviemos a nuestros clientes. Dentro del callback tenemos siempre dos parametros, el request y el response. En el response enviamos el mensaje de respuesta deseado. 

Debemos colocar ademas que la aplicacion escuche en el puerto designado. También podemos utilizar un callback, que nos diga que cuando se esté ejecutando envíe un console.log. Para probarlo hacemos **npm run dev**. Si vamos en nuestro navegador a: http://127.0.0.1:3000/ vemos que nos envía el mensaje que habíamos colocado en la respuesta. 

## **Routing con Express.js**
 
Podemos comenzar a crear las rutas que queramos. Colocando en el get('/algo') vamos a enviar los mensajes que queramos. En el caso anterior usamos send, para enviar un mensaje de tipo string, pero por lo general vamos a utilizar json, con res.json({}) 

La definición de ruta tiene la siguiente estructura:

**app.METHOD(PATH, HANDLER)**

Donde:
- app es una instancia de express.
- METHOD es un método de solicitud HTTP.
- PATH es una vía de acceso en el servidor.
- HANDLER es la función que se ejecuta cuando se correlaciona la ruta.

## **RESTFUL API**

REST: Representational State Transfer
Es una conveccion que se refiere a servicios web por protocolo HTTP

Metodos:
*Get: Obtener
*Put: Modificar (modifica el dato anterior, por el nuevo, eliminando los datos que no se pasaron)
*Patch: Actualizar (actualiza solo lo que envíamos, sin modificar lo que no se envió)
*Post: Crear
*Delete: Eliminar

### **GET: recibir parámetros**

Una de las convensiones de REST es que cuando tenemos un endpoint, podemos definir la entidad y luego el id. Por ejemplo si tenemos tareas el endpoint sería: api.example.com/tasks/{id}/ con esto obtendríamos esa tarea en especifico. 

Realizamos una nueva ruta en la cual solicitamos que se nos envíe el id. Debemos de saber que dentro de la request tenemos una propiedad que es params, la cual nos envía todos los parámetros, dentro de un objeto: **const {id} = req.params** (las llaves de id las utilizamos para desestructurar los parámetros, guardandonos justamente el que precisamos). Si guardamos esa constante dentro del objeto que estamos devolviendo, al hacer el llamado a la ruta podemos devolver ese valor en el HTML. 

Luego podemos realizar lo mismo pero con dos parámetros. Para esto debemos tener en cuenta que dentro del mismo endpoint no podemos tener el mismo nombre para dos parámetros, es decir si tenemos: categories/:id/products/:product, no podemos repetir el id en ambos casos.  


### **GET: parámetros query**

Para realizar comportamientos específicos en las solicitudes se suelen usar los parámetros query que se indican en la url como **?nombreParametro=valor**&&**nombreParametro2=valor2** , se usa para paginación , para limitar cantidad de datos a devolver al usuario, etc. 

Como los parametros son opcionales no van a estar definidos directamente en la ruta. Sino que vienen como parametros dentro de nuestra request. Estos parametros los obtenemoss desde la propiedad de la request que se llama **query**. 

Como los parametros son opcionales utilizamos un if, para conocer si el usuario los utilizó. 

Vamos a instalar una libreria que genera datos falsos => 
```bash
npm i faker@5.5.3 -S
```
o sino también existe la opción
```bash
npm i @faker-js/faker
``` 
Al instalar esta última version, para utilizarla debemos colocar el require de la siguiente manera:
```javascript
const { faker } = require('@faker-js/faker');
```

Luego de instalarla la importamos en el archivo index, y ahora podremos crear datos falsos para poder hacer mejor nuestras querys.
Para agregar datos, dentro de nuestra query de productos, vamos a realizar un for, con el valor de iteración que nosotros deseamos (cantidad de datos). Por cada vuelta del ciclo hacemos un push a un array que llamaremos products, donde agregaremos el nombre, el precio (en base 10), y una imagen. 

Luego de contar con los datos, podemos hacer diferentes query, ejemplo - ?size=8. Podemos en la creación de la ruta decirle que si no viene un query parameter con la cantidad de productos, por defecto nos mande 8. 

Para que no haya problemas con las rutas debemos colocar todo lo que es especifico, antes de lo que es dinamico. Esto quiere decir que si tenemos una ruta /filter irá antes en el código, que una ruta /:id. Ya que sino filter será tomado como un params, y por lo tanto nunca llegará a ingresar en ese endpoint. 

### **Separación de responsabilidades con express.Router**

Esto significa que cada pieza de código deberia tener una sola responsabilidad. Hasta el momento estamos haciendo todo el routing en un solo archivo por lo que no estamos cumpliendo con este principio. 

Lo primero es crear una carpeta llamada routes. Luego creamos el archivo de las rutas de products, donde por lo general se los firma, es decir se le coloca con camelcase o con . el nombre especifica a lo que refiere. En este caso usamos **products.route.js**

Pasamos las rutas de productos a este nuevo archivo. Debemos de envíar también a express y faker. Como no vamos a tener acceso a la aplicación, creamos un **router**.

```javascript
const router = express.Router()
```
Esta línea de código se utiliza para definir una instancia de **router** para manejar las rutas en una aplicación web.

Un **router** es una especie de mini aplicación que sólo maneja rutas y middleware, y puede ser utilizado para organizar y modularizar una aplicación web más grande.

Por lo tanto **router** es un objeto que nos permite definir las rutas para nuestra aplicación, y asociarles las funciones correspondientes que se ejecutarán cuando se acceda a ellas.

También debemos de saber que como estamos en el archivo de las rutas de products, no es necesario colocar el nombre en las rutas. 

Indicamos que queremos exportar al final del archivo 
```javascript
module.exports = router 
```
Creamos otro archivo index.js el cual contará con la ruta products, ya que en el archivo anterior solo estabamos colocando los detalles. Aqui recibiremos la **app** como parametro para una función. La función se encargará de manejar el detalle que nos llegue desde el cliente. Para finalizar exportamos la función. 
 
Luego hacemos lo mismo para users, creando el archivo **users.router.js**.  

En el index general (que no se encuentra en routes, sino en el inicio de nuestra aplicación), debemos de traernos la carpeta routes, donde no es necesario colocar index.js ya que es algo automatico que hace el sistema. 

### **POST: método para crear**

Antes de comenzar con POST, es importante saber que por lo general se comienzan las rutas con un versionado. Por lo tanto hay que colocar una **ruta maestra** la cual controlará las versiones, y será de la cual todas partan => 
```javascript
app.use('/api/v1', router);
```
Como vamos a realizar un POST debemos contar con una herramienta que emule el envío, en este caso voy a utilizar thunder client, pero se puede usar POSTMAN o Insomia. 

Dentro del archivo products.router.js creamos la ruta para el metodo POST. Creamos una constante body que será el encargado de recibir todos los valores. 

Debemos crear un **middleware** para poder recibir los valores que nos envían tipo json 
```javascript
app.use(express.json());
```
esto lo colocamos en el index principal. 

### **PUT, PATCH y DELETE** 

Si vamos actualizar los valores con **PUT** debemos de enviar en la ruta un identificador único para ese producto. Pero a su vez debemos de tener en cuenta que en estos casos también es necesario pasar todos los campos, aunque queramos solo modificar 1. Como ejemplo podemos pensar que queremos modificar el precio, pero si lo hacemos con PUT debemos de pasar nombre, detalle, imagen, etc.

Para actualizar parcialmente utilizamos **PATCH**, el cual nos permite a través del identificador del producto en este caso, cambiar solo el campo deseado. La ruta para PATCH es muy similar a la ruta para POST. 

Para **DELETE** también tenemos un comportamiento similar, recibiendo un id, pero en este caso no tendrá un cuerpo. 


### **Códigos de estado o HTTP response status codes**

Los códigos de estado (status code) permiten al cliente conocer como su nombre lo indica el estado de la petición realizada ,  de esa forma podra saber si una petición se ha realizado correctamente, ha tenido errores o ha presentado algunos inconvenientes durante el proceso.

Hasta el momento todas las rutas nos devuelven el status code 200, pero si utilizam POST para crear un producto, debería devolvernos 201. La forma de agregarlo es en la respuesta que hacemos al cliente => 
```js
res.status(201).json({ message : "Created successfully" ..
```

Para cuando nos solicitan un producto que no está en la lista, podemos enviar un 404, esto lo hacemos en la ruta de GET, mediante un condicional. Debemos recordar que todos los parametros vienen como un string, así que debemos de colocarlo así dentro del condicional.  

### **Introducción a servicios: creando primer servicio**

Hasta ahora habiamos trabajado solo en el routing, pero ahora veremos la lógica del negocio, ahí es donde están los servicios. Esto sale de una arquitectura, la cual está definida por capas. La capa más pequeña es la de **identidades**, luego **casos de uso** (servicios) donde está todo lo relacionado a la lógica del negocio. Más arriba están los **controladores**, que son los que brindan acceso, donde encontramos todo el routing y middlewares. 

Para separar los servicios que es la lógica del negocio del routing, comenzamos con crear una carpeta llamada services. Luego creamos un archivo dentro de esta para productos. Vamos a comenzar a utilizar programación orientada a objetos, necesitamos gestionar todo lo que son los productos, es decir crear, editar, etc.

Creamos la clase **ProductsService** donde le vamos a colocar todas las funciones que hacen referencia a los distintos servicios (lógica del negocio). Por ahora vamos a trabajar con datos en memoria, no lo conectaremos a una base de datos, es solo para entender la lógica. Por esto vamos a crear un método que nos permita generar los datos a partir de faker. Cada vez que generamos una instancia del producto nos va a generar 100 datos, ya que construimos el método con ese valor. 

Para el método find el return es muy sencillo, ya que devuelve todos los valores. Podemos probar importando en el router ese productsService. Luego de importarlo creamos una instancia. Dentro de la ruta podemos utilizar la instancia para llamar al método deseado => 
```js
const products = service.find();
```

Para encontrar a un producto en particular podemos hacer lo mismo, pero teniendo en cuenta que lo estamos buscando por un id, y en este caso nuestra base de datos falsa no contaba con id, por lo que debemos agregarle.

### **Crear, editar y eliminar desde el Servicio**

Estamos manejando un tipo de persistencia en memoria de la base de datos, esto significa que si cerramos la terminal y corremos nuevamente el programa, los datos que teniamos no existiran. Solo existen si mantenemos el programa corriendo. 

Para **create** tenemos que crear un id con faker, pero para los otros campos, nos los deberá entregar el cliente. Colocamos el spread operator para que concatene los valores recibidos por el cliente. 
La **sintaxis extendida** o **Operador de propagación** de JavaScript ( ...) nos permite copiar rápidamente todo o parte de una array u objeto existente en otra array u objeto. 
```js
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
```

Luego de tener el nuevo producto, le hacemos un push, para agregarlo al array de productos. Finalizando retornamos el producto creado. Después en router vamos a recibir la data por parte del cliente, utilizamos el método para crear un nuevo producto y respondemos con ese producto creado. 

Para **editar** o **update**, lo primero es buscar el indice del producto que vamos actualizar, y luego con un condicional preguntar si el indice existe, (findIndex devuelve un -1 si el indice no se encuentra). En este caso también vamos hacer uso del **spread operator**, donde concatenamos los valores que teniamos del producto, con los nuevos. Estos valores que pasemos van a sobreescribir los valores del objeto, donde la llave sea la misma. En los otros casos, o si no le envíamos la llave, los valores no cambiaran. 

Con **delete** la lógica es bastante similar que para update, ya que primero debemos de buscar cual es el producto que queremos eliminar. Luego utilizamos el método **splice** de los arrays, para eliminar ese producto de nuestro array. 

### **Async await y captura de errores**

En este caso como estamos trabajando con un array en memoria el proceso es sincrono, o sea que no necesitamos esperar ningun proceso para que nos llegue el resultado. Esto en la realidad debería de ser un proceso asincrono, ya que así son los servicios.  

Debemos colocar **async** en cada uno de los métodos, de esta forma NODE los tratará de forma asincrona como una promesa. Tenemos que tener en cuenta que si colocamos esto debemos también tener un **await**. 

En las router, también tenemos que colocar el **async** y **await**. 

Vamos a emular un tiempo de demora para cuando hacemos el get de productos. Para esto nos vamos al método find en servicios, y vamos a colocar una promesa. Le damos un tiempo de espera de 5 seg, para que nos devuelva la información. 

Al manejar todo de forma asincrona, nos permite manejar los errores con **try catch**. Cuando haciamos la actualización de información, si el id no lo encontraba lanzaba un error. Entonces ahora podemos colocar **try catch**, donde tratamos de encontrar el id y devolver la respuesta con un json, pero si en alguna de las líneas hay un error lo vamos a capturarlo y a responderlo. 

### **Middlewares**

Estos se encuentran entre el request y el response, es donde nos permite procesar lógica *REQUEST --> MIDDLEWARE --> RESPONSE*. Pueden ser utilizados de forma global, por ejemplo al capturar todos los errores de nuestra aplicación, o de forma única para cada uno de los endpoints. Pueden funcionar de forma secuencial, quiere decir que podemos tener varios middlewares uno detrás de otro *REQUEST --> MIDDLEWARE -->  MIDDLEWARE -->  MIDDLEWARE --> RESPONSE*. Por jemplo el primer middleware podría comprobar si tenemos lógica de autentificación, luego en el segundo middleware hacemos otra comprobación, y así sucesivamente, lo que necesitemos. Por lo tanto un middleware en algun momento podría bloquear, ya que un middleware que valida permisos, si no se envían los correctos no permite continuar al siguiente middleware. 

La lógica es dentro de nuestra función que tenemos un request y responde como parámetros, también le vamos agregar un next. Este es el que nos va a permitir continuar. 

Ejemplo:
```js
function (req, res, next) {
  if(something) {
    res.send('end')
  } else {
    next();
  }
}
```
También existen los middlewares de tipo error, donde el primer parámetro para la función es el error. 
Ejemplo:
```js
function (error, req, res, next) {
  if(error) {
    res.status(500).json({error}); 
  } else {
    next();
  }
}
```

Casos de uso:
- Funcionan como pipes: la salida de uno, es la entrada de otro. 
- Validar datos.
- Capturar errores.
- Validar permisos. 
- Controlar accesos. 

### **Middleware para HttpErrors**

Vamoas a implementar un middlewae para los errores (global, para toda la aplicación). Vamos a crear una carpeta solo para los middlewares, y dentro de esta creamos un archivo para error handler. 

Construimos una funcion **logError** donde enviamos como parametros el error, la request, la response y el next. En este caso solamente imprimimos en consola el error, y luego mostrar el error en servidor para poder monitorearlo **next(err);**. Importante para saber que lo estamos ejecutando como un middleware de tipo error, si no le enviamos nada entonces lo ejecutamos como uno de tipo normal.

Luego vamos a crear otra función **errorHandler**, este detectara un error, pero vamos a crear un formato para poder devolverselo a nuestro cliente. Este cambia a que no queremos seguir a nuestro siguiente middleware, si hay un error que sea el punto donde finaliza. Entonces si existe un error enviamos la respuesta con un status 500. También enviamos un json, con el mensaje de error e incluimos una propiedad llamada **stack**. Esta propiedad contiene una cadena de texto que describe la pila de llamadas de funciones que se encontraban en ejecución cuando se produjo la excepción error. Esta información es útil para la depuración de errores ya que puede ayudar a identificar el origen del error y las funciones involucradas en el proceso. Sin embargo, esta información no debería exponerse públicamente en una aplicación en producción ya que puede ser utilizada malintencionadamente para encontrar vulnerabilidades en el sistema. 

Debemos recordar que aunque no estemos utilizando el next, debemos ponerlo, ya que es la forma en como detecta que es un middleware de tipo error. Por lo tanto debemos incluir los 4 parametros a la función. 

Los middleware de tipo error los debemos colocar después de definir el routing, en el index de la aplicación. Entonces después de importarlos con require colocamos lo siguiente: 
```js
app.use(logErrors);
app.use(errorHandler); 
```
Tomar en consideración en que orden se están ejecutando, es decir en el orden que los colocamos en las líneas anteriores, será el orden en el que se ejecutaran. 

Debemos capturar el error de forma explicita desde el routing y luego ejecutar el middleware del error. Por lo tanto en el routing de get un producto, agregamos next en los parametros de la funcion asincrona. Por lo tanto colocamos un try catch, donde le colocamos explicitamente en el catch, que si hay un error, ejecutemos el middleware de tipo error, con el next. Colocamos a proposito una funcion que no existe getTotal,  para generar un error en el metodo findOne de products. 

Al intentar obtener un producto desde thunder client, obtenemos el siguiente mensaje de error:
```bash
{
  "message": "this.getTotal is not a function",
  "stack": "TypeError: this.getTotal is not a function\n...
``` 

### **Manejo de errores con Boom**

Hacemos la instalacion de la libreria Boom

```bash
npm i @hapi/boom
```

La requerimos en los servicios de los productos. Ahora vamos a poder manejar los errores de manera más amigable. En cada lugar que tenemos un error, podemos devolver el status code correspondiente con los métodos que nos aporta esta libreria. Tambiém le podemos enviar los mensajes que deseamos.  

Boom tiene un formato especial, para manejar los errores. Por lo que podemos crear un middleware que sea para la libreria boom. Al crear este middleware utilizamos una propiedad que se crea cuando el error es de tipo boom (isBoom). Agregamos al middleware que si el error no es de tipo boom, que ejecute un middleware de tipo error normal. 

Luego de agregar este middleware al index, podemos buscar un producto que no existe para probar que nos lanza un 404. 

Podemos inventar que haya pructos que no se puedan ver, esto para crear un nuevo error, asi probamos la libreria boom con otro caso. Por lo tanto al metodo de generar productos, le vamos agregar una propiedad que sea, si esta o no blockeado. Esto será un booleano, lo que nos devolverá true y false. Entonces al momento de buscar un producto podemos agregar un if, que pregunte si está blockeado. Si es true, enviamos un error boom de tipo conflict. 

Por lo tanto si utilizamos el thunder client para traer todos lo productos, podemos ver cuales tienen la propiedad de blockeado. Y si queremos buscar uno que sea true, nos va aparecer el error que creamos.  

### **Validación de datos con Joi**
 
Otro caso de uso para los middlewares es validar los datos, que nos envían los clientes, como ser fechas, urls, comprobar que al querer crear un producto nos envíen todos los datos, etc. 

Instalaremos para esto la libreria joi
```bash
npm i joi
``` 

Vamos a crear una carpetas donde colocaremos los **schemas** (tamnién los podemos encontrar como dto = data transfer object), que son las comprobaciones para nuestros objetos (productos, etc). Cada eschema tendrá, para cada uno de sus campos, las comprobaciones que nosotros deseemos. Podemos hacer un schema para crear el objeto, para actualizarlo, para cuando hacemos un get.  

Para utlizarlos vamos a crear un middleware, al cual podemos enviar nuestros schemas, para hacer la comprobación de los campos. Por lo tanto creamos en la carpeta middleware, un nuevo archivo llamado validator.handler. Dentro creamos la funcion para validar los schemas, la cual recibe por parametro el schema, y la propiedad. Aquí se crea un middleware de forma dinámica (se usa closure).
Si se recibe el schema, con schema.validate() se valida la información que se desea validar. La información viene de data, la cual viene de un request (body, params, query). Si hay un error (no cumple con la validación), entonces se envía un error de tipo boom. Si no hay error, el servicio sigue (next()). 

### **Probando nuestros endpoints** 

Vamos a utilizar las validaciones que creamos, en los endpoints. Las validaciones que creamos son middleware, y podemos concatenar la cantidad que queramos, por lo que antes de traer un producto, vamos a colocar el middleware de validatorHandler. En este caso como es para obtener un producto, debemos de pasarle como parametro el schema getProductSchema. Y el segundo parametro, es de donde viene la información, en este caso es por params. 

En el caso de un endpoint como patch, podemos poner más validators, por ejemplo que valide primero que estamos tratando de obtener un producto que existe, y luego que los parametros que le estamos pasando en el body para modificar son los correctos.  

Hasta ahora, cuando creamos un producto y tenemos varios errores, nos envía el primer error que encuentra. Es decir, si tenemos mal el nombre y el precio, nos envia que el nombre está mal, y recién después de corregirlo, nos dice que el precio está mal. Por lo que puede ser molesto. Podemos hacer una modificación de esto, y que nos mande todos los mensajes de error desde el primer momento. Agregamos en el validatorHandler, que el **abortEarly** sea false. 


### **Lista de middleware más populares con express** 

A continuación una lista de los middlewares más populares en Express.

**CORS**
Middleware para habilitar CORS (Cross-origin resource sharing) en nuestras rutas o aplicación. http://expressjs.com/en/resources/middleware/cors.html

**Morgan**
Un logger de solicitudes HTTP para Node.js. http://expressjs.com/en/resources/middleware/morgan.html

**Helmet**
Helmet nos ayuda a proteger nuestras aplicaciones Express configurando varios encabezados HTTP. ¡No es a prueba de balas de plata, pero puede ayudar! https://github.com/helmetjs/helmet

**Express Debug**
Nos permite hacer debugging de nuestras aplicaciones en Express mediante el uso de un toolbar en la pagina cuando las estamos desarrollando. https://github.com/devoidfury/express-debug

**Express Slash**
Este middleware nos permite evitar preocuparnos por escribir las rutas con o sin slash al final de ellas. https://github.com/ericf/express-slash

**Passport**
Passport es un middleware que nos permite establecer diferentes estrategias de autenticación a nuestras aplicaciones. https://github.com/jaredhanson/passport

Puedes encontrar más middlewares populares en el siguiente enlace: http://expressjs.com/en/resources/middleware.html


### **Consideraciones para producción**

CORS (Cross-Origin Resource Sharing) es un mecanismo que permite a los navegadores web y otros clientes web acceder a recursos de un servidor que se encuentra en un origen diferente al origen desde el cual se solicitó el recurso original. Los navegadores modernos implementan medidas de seguridad para prevenir solicitudes HTTP desde un origen diferente al del recurso original, a menos que el servidor al que se solicita el recurso especifique explícitamente que permita la solicitud.

Para permitir que los clientes web accedan a recursos desde un origen diferente, el servidor puede enviar encabezados CORS en su respuesta HTTP. Estos encabezados especifican qué orígenes pueden acceder a los recursos y qué tipos de solicitudes HTTP se permiten. El servidor también puede especificar otros detalles de la política CORS, como la duración máxima de las solicitudes preflight y las credenciales de autenticación que se permiten en las solicitudes.

En resumen, CORS es un mecanismo que permite a los navegadores web y otros clientes web acceder a recursos de un servidor que se encuentra en un origen diferente al origen desde el cual se solicitó el recurso original, siempre y cuando el servidor permita explícitamente el acceso mediante el envío de encabezados CORS adecuados. 

### **Problema de CORS**

Para habilitar CORS en todos los requests en Express, se puede utilizar el middleware cors. Este middleware permite configurar y habilitar CORS en todas las rutas del servidor.

Para usar el middleware cors en Express, se debe instalar primero el paquete cors:
```bash
npm install cors
```
Luego, se puede agregar el middleware en el archivo principal de la aplicación: 
```js
const cors = require('cors');

app.use(cors());
``` 
De esta manera, se habilitará CORS en todas las rutas de la aplicación y se permitirá el acceso desde cualquier origen. Esto puede o no ser aconsejable. 

En el caso de querer restrignir el acceso, podemos crear un array que llamamos whitelist, el cual son los dominios que permitiremos. Estos los colocamos en una constante que llamamos options, que es lo que enviaremos como parametro a cors. 

[Go up](#top)


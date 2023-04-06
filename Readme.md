# Backend con Node - API REST con Express.js

<a name="top"></a>

## [English](#item1)
## [Spanish](#item2)

<a name="item1"></a>

## English
 
### Used technology: JAVASCRIPT, HTML, CSS

## Abstract

[Go up](#top)

<a name="item2"></a>

## Spanish
 
## Tecnologías utilizadas: JAVASCRIPT, HTML, CSS

## Resumen

Utilizando Express.js haremos un proyecto de una tienda virtual, con productos, categorías, etc. 
¿Qué es Express.js? 
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





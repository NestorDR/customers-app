// node-server.js - Para simular error de validación en servidor
// Visitar: https://github.com/typicode/json-server#module
// Ejecutar previamente: npm install json-server --save-dev

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const idToGenerateError = '30000001';

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'PUT') {
    // Mostrar body del request
    const body = req.body;
    console.log('PUT', body);

    // Evaluar error en cliente con identificador = idToGenerateError = '30000001'
    if (body.id && body.id === idToGenerateError
        && body.age && body.age > 18) {
      console.log('Error de Validación');
      return res.status(500).send(
        {
          'mensajesError': {
            'age': 'Debe ser menor de edad',
            'name': 'El nombre es incorrecto - Fake error',
            '_error': 'Falló actualización'       // Esta propiedad actúa como bandera de error
          }
        });
    } else {
      console.log('Validación exitosa');
    }
  }

  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running')
});


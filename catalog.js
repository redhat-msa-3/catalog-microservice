const fs = require('fs')
const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: {
    info: {
      title: 'Catalog Swagger API',
      version: '1.0.0',
      description: 'Catalog methods',
    },
  basePath: '/',
  },
  // path to the API docs
  apis: ['./catalog.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.header("Access-")
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

var swaggerOptions = {
    swaggerOptions: {
      explorer : false,
      validatorUrl : null,
      swaggerUrl: 'http://localhost:8080/swagger.json'
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /catalog:
 *   get:
 *     description: Get call catalogs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: catalog list
 */
app.get('/catalog', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile('Trips.json', { root: __dirname })
})

/**
 * @swagger
 * /download/{id}:
 *   get:
 *     description: Get the trip Image
 *     parameters:
 *       - name: id
 *         description: Picture name
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - image/png
 *     responses:
 *       200:
 *         description: trip image
 */
app.get('/download/:pictureName', (req, res, next) => {
    var pic = req.params.pictureName
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(pic, { root: __dirname + '/pictures/'}, (err) => {
      if (err) res.status(404).send('File ' + pic + ' not found')
    })
})

app.get('/', (req, res) => {
  res.redirect('/api-docs')
})

module.exports = app.listen(8080, () => console.log('Catalog microservice listening on port 8080!'))

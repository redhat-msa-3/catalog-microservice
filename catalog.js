/**
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// serve swagger
app.get('/swagger.json', function(req, res) {
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
    res.sendFile(pic, { root: __dirname + '/pictures/'}, (err) => {
      if (err) res.status(404).send('File ' + pic + ' not found')
    })
})

app.get('/health', (req, res) => {
  res.send('I\'m OK')
})

app.get('/', (req, res) => {
  res.redirect('/api-docs')
})

module.exports = app.listen(8080, () => console.log('Catalog microservice listening on port 8080!'))

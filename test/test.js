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
var expect  = require('chai').expect
var request = require('request')
var server = require('./../catalog.js')

describe('REST endpoints', function() {
  describe('/health', function() {
    it('Health endpoint must exist', function(done){
      request('http://localhost:8080/health' , function(error, response, body) {
        expect(body).to.equal('I\'m OK')
        done()
      })
    })
  })
  describe('/catalog', function() {
    it('Catalog must be a JSON array', function(done){
      request('http://localhost:8080/catalog' , function(error, response, body) {
        var ret = JSON.parse(body)
        expect(ret).to.be.an('array')
        done()
      })
    })
    
    it('Catalog array must have two items', function(done){
      request('http://localhost:8080/catalog' , function(error, response, body) {
        var ret = JSON.parse(body)
        expect(ret).to.have.length(2)
        done()
      })
    })
    it('Catalog must have CORS enabled', function(done){
      request('http://localhost:8080/catalog' , function(error, response, body) {
        var ret = response.headers['access-control-allow-origin']
        expect(ret).to.equal('*')
        done()
      })
    })
  })
  
  describe('/download', function() {
    it('404 on Downloading an non existing image', function(done){
      request('http://localhost:8080/download/notexisting' , function(error, response, body) {
        expect(response.statusCode).to.equal(404)
        done()
      })
    })
    it('Download an existing image', function(done){
      request('http://localhost:8080/download/rafting.jpg' , function(error, response, body) {
        expect(response.statusCode).to.equal(200)
        done()
      })
    })
  })
  
  describe('/api-docs', function() {
    it('API docs must exist', function(done){
      request('http://localhost:8080/api-docs' , function(error, response, body) {
        expect(response.statusCode).to.not.equal(404)
        done()
      })
    })
  })

  describe('/', function() {
    it('Must redirect to API docs', function(done){
      request('http://localhost:8080/' , function(error, response, body) {
        expect(response.request.path).to.equal('/api-docs/')
        done()
      })
    })
  })
  
  after(function() {
    server.close()
  })
})


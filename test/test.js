var expect  = require('chai').expect
var request = require('request')
var server = require('./../catalog.js')

describe('REST endpoints', function() {
  describe('/catalog', function() {
    it('Catalog must be a JSON array', function(done){
      request('http://localhost:8080/catalog' , function(error, response, body) {
        var ret = JSON.parse(body);
        expect(ret).to.be.an('array')
        done()
      })
    })
    
    it('Catalog array must have two items', function(done){
      request('http://localhost:8080/catalog' , function(error, response, body) {
        var ret = JSON.parse(body);
        expect(ret).to.have.length(2);
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


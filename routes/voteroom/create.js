'use strict'

const { createOne } = require('../../model')


module.exports = async function (app, opts) {
  app.post('/', async function (request, reply) {
   
   const result = await createOne(this.mongo, request.body)
   
 reply
    .code(200) 
    .header('content-type', 'application/json')
    .send(result) 
  })
}
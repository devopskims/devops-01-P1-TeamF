'use strict'

const { readOne, createOne } = require('../../model')


module.exports = async function (app, opts) {
  app.post('/', async function (request, reply) {
   
   const result = await createOne(this.mongo, request.body)
   comsole.log(result)
 reply
    .code(200) 
    .header('content-type', 'application/json')
    .send(result) 
  })
}

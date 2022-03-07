'use strict'

const { readOne, createOne } = require('../../model')


module.exports = async function (app, opts) {
  app.post('/', async function (request, reply) {
   
   const result = await createOne(this.mongo, request.body)
   const results = await readOne(this.mongo,result.instertedid)
 reply
    .code(200) 
    .header('content-type', 'application/json')
    .send(results) 
   
    reply
    .code(200) 
    .header('content-type', 'application/json')
    .send(result) 
  
  
  })
}

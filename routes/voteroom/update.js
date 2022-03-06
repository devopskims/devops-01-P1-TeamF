'use strict'
const { updateOne } = require ('../../model')

module.exports = async function (fastify,opts) {

    
fastify.patch ('/voteroom/:id/vote', async function (request, reply) { 
    const result = await updateOne (this.mongo,request.params.id,request.body )

    reply
    .code (200 )
    .header ('Content-Type', 'application/json', 'charset=utf-8')
    .send (result)


})
}






  


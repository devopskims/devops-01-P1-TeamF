'use strict'
const { readPublicOne, readPrivateOne, updateOne } = require ('../../model')

module.exports = async function (fastify,opts) {

    fastify.patch ('/:id/vote', async function (request, reply) { 
        const result = await updateOne (this.mongo, request.params.id, request.body)
        const id = request.params.id
        
        if(result.private){
            const modify = await readPrivateOne (this.mongo, request.params.id) 
            reply
            .code(200)
            .header('Content-Type', 'application/json', 'charset=utf-8')
            .send(modify)
        } else{
            const modify = await readPublicOne (this.mongo, request.params.id, request.body.password)
            reply
            .code(200)
            .header('Content-Type', 'application/json', 'charset=utf-8')
            .send(modify)
            }

    })
}

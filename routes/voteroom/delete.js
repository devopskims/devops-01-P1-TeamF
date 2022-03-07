'use strict'

const { deleteOne, readOne } = require('../../model')

module.exports = async function (fastify, opts) {

  // 전체 조회
  fastify.delete('/:id/delete', async function (request, reply) {
    const id = request.params.id
    const sendResult = await readOne(this.mongo, id)
    const result = await deleteOne(this.mongo, id)
    
    reply
      .code(200)
      .header('content-type', 'application/json')
      .send(sendResult) 
  })
  
}
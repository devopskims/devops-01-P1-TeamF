'use strict'

const { deleteOne, readOne, readPrivateOne, readPublicOne } = require('../../model')

module.exports = async function (fastify, opts) {

  // 전체 조회
  fastify.delete('/:id/delete', async function (request, reply) {
    const id = request.params.id
    const sendResult = await readOne(this.mongo, id)
    if (sendResult.private){
      const result = await readPrivateOne(this.mongo, id, sendResult.password)
      reply
      .code(200)
      .header('content-type', 'application/json')
      .send(result) 
      const dr = await deleteOne(this.mongo, id)
    }
    else {
      const result = await readPublicOne(this.mongo, id)
      reply
      .code(200)
      .header('content-type', 'application/json')
      .send(result) 
      const dr = await deleteOne(this.mongo, id)
    }
  })
}
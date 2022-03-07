'use strict'

const { readAll, readOne, readPublicOne, readPrivateOne } = require('../../model')

module.exports = async function (fastify, opts) {

  // 전체 조회
  fastify.get('/', async function (request, reply) {
    const result = await readPublicAll(this.mongo)
    
    reply
      .code(200)
      .header('content-type', 'application/json')
      .send(result) 
  })


  fastify.get('/:id', async function (request, reply) {
    const result = await readPublicOne(this.mongo, request.params.id)

    if (result){
      reply
      .code(200)
      .header('content-type', 'application/json')
      .send(result)
    }
    else{
      reply
      .code(404)
      .header()
      .send(result)
    }
  })

  // 비공개 투표 1개 조회
  fastify.post('/:id', async function (request, reply) {
    const result = await readPrivateOne(this.mongo, request.params.id, request.body.password)
    console.log(result)
    if (result){
      reply
      .code(200)
      .header('content-type', 'application/json')
      .send(result)
    }
    else {
      reply
      .code(404)
      .header()
      .send(result)
    }


  })
}
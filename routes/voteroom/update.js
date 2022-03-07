'use strict'
const { readPublicOne, readPrivateOne, updateOne } = require ('../../model')
const { readSessionOne, updateSessionOne } = require ('../../model/session')

module.exports = async function (fastify,opts) {

    fastify.patch ('/:id/vote', async function (request, reply) { 
        const id = request.params.id
        const token = request.headers.authorization
        if (!token){
            reply.code(401).send({message:"토큰이 없습니다."}) 
        } else{
            const sessionResult = await readSessionOne(this.mongo,token)
            if(sessionResult){
                if (sessionResult.voted_list.includes(id)){
                    reply
                    .code(200)
                    .send({
                        message: '재투표할 수 없습니다.'
                    })
                }
                else{
                    const sr = await updateSessionOne(this.mongo, sessionResult._id, id)
                    const result = await updateOne (this.mongo, request.params.id, request.body)
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
                }
            
            } else {
                reply.code(401).send({message:'잘못된 토큰입니다.'})
            }
        } 
    })
}




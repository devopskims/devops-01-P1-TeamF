'use strict'
const { readPublicOne, readPrivateOne, updateOne } = require ('../../model')
const { readSessionOne, updateSessionOne } = require ('../../session.js')
//(this.mongo, session_value) (this.mongo, session_id, vote_id)

module.exports = async function (fastify,opts) {

    fastify.patch ('/:id/vote', async function (request, reply) { 
        const id = request.params.id
        const token = request.header.authorization
        
        if (!token){
            reply.code(401).send({message:"토큰이 없습니다."})  // if 토큰없음 else 토큰있음{ if 토큰이 디비에 있다 딘ㄷ }
            } else{
                reply.code(200).send({message:"로그인에 성공을 하였습니다."})
                if(token === readSessionOne){
                const sessionResult = await readSessionOne(this.mongo,token)
                reply.code(401).send({message:'잘못된 토큰입니다.'})
                } else {
                    reply.code(401).send({message:''})
                }
            } 
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

    })
}




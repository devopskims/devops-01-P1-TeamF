'use strict'

module.exports = async function (fastify, opts) {
  fastify.patch('/voteroom/:id/vote', async function (request, reply) {
   // const getinfo = async (authorization) => const {data} = await APi.get ('/voteroom/:id') 
    const result = await update(mogoDB,request.params.id, request.body)
    
    req headers
        {
          "authorization": "authorization token"
          
        }
        req body
        {
          "choice_list": {
              "돼지국밥": 1,
              "김치찌개": 4
          }
        } {
          return reply
          .code (200 )
          .header ('Content-Type', 'application/json', 'charset=utf-8')
          .send ({"value" :result })
        }


//     
    // 투표 항목에 투표 응답 바디

//     res body

//     {
//       "title": "점심메뉴",
//       "choice_list": {
//             "돼지국밥": 1,
//             "김치찌개": 4
//       }
//       "multi_choice": true,
//       "startDate": 2022-03-03,
//       "periodDay": 1
//     }


//   })
// }
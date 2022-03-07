const { ObjectId } = require('fastify-mongodb')

module.exports = {

 readSessionOne: async (mongo, sessionValue) => {
    const collection = mongo.db.collection(process.env.COLLECTION_SESSION)
    const result = await collection.findOne({
      session_value: sessionValue
    })
    return result
  },
  updateSessionOne: async (mongo, sessionId, voteId) => {
    const collection = mongo.db.collection(process.env.COLLECTION_SESSION)
    let sessionResult = await collection.findOne({
        _id: ObjectId(sessionId)
      })
    sessionResult.voted_list = sessionResult.vote_list.push(voteId)

    const result = await collection.findOneAndUpdate({
      _id: ObjectId(sessionId)
    }, {
      $set: sessionResult
    })
    return result
  }
}
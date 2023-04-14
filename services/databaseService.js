const { MongoClient} = require('mongodb')
const mongoUrl = 'mongodb://root:password@localhost:27017'
const {serverErrorResponse} = require('./validationService')

async function getCollection() {
    const connection = await MongoClient.connect(mongoUrl)
    return connection.db('robotsApi').collection('robots') 
}

module.exports = getCollection


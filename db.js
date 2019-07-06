const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = process.env.MONGO_URI

const initMongo = async () => {
	let db
	try {
		db = await MongoClient.connect(url)
	} catch(error) {
		return console.log('Could not connect to mongoDB', error)
	}
	console.log('Connected to: ', url)
	return db
}

module.exports = initMongo

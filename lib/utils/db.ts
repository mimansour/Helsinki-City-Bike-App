import { MongoClient } from 'mongodb'

declare global {
  // Necessary for dev work.
  var _mongoDevClient: Promise<MongoClient>
}

const uri = process.env.MONGODB_URI

let client: Promise<MongoClient>

if (!uri) {
  throw new Error('Please add Mongo URI to env variables.')
}

if (process.env.NODE_ENV === 'development') {
  // A global variable is used so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const hasCachedClient = !!global._mongoDevClient

  if (!hasCachedClient) {
    global._mongoDevClient = new MongoClient(uri).connect()
  }

  client = global._mongoDevClient
} else {
  client = new MongoClient(uri).connect()
}

export const MONGO_DEFAULT_DB = 'cityBikeApp'
export const mongoClient = client

import 'babel-polyfill'
import natsServer from 'nats'
import Hemera from 'nats-hemera'
import { MongoClient } from 'mongodb'

import resolvers from './resolvers'

const {
  NATS_URL,
  MONGO_URL,
  DB_NAME,
} = process.env

const nats = natsServer.connect({
  url: NATS_URL,
});

const hemera = new Hemera(nats, {
  logLevel: 'silent',
});

hemera.ready(async () => {
  const client = new MongoClient(MONGO_URL,{ useNewUrlParser: true })
  await client.connect()

  const db = client.db(DB_NAME);

  await resolvers({
    hemera,
    db
  })

  console.log("DB Service running successfully")
})

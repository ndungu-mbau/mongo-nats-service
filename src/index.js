import 'babel-polyfill'
import natsServer from 'nats'
import Hemera from 'nats-hemera'
import { MongoClient } from 'mongodb'

import config from './config'

import resolvers from './resolvers'

const {
  NODE_ENV = 'development',
  NATS_URL } = process.env

const nats = natsServer.connect({
  url: NATS_URL,
});

const hemera = new Hemera(nats, {
  logLevel: 'silent',
});

hemera.ready(async () => {
  const client = new MongoClient(config[NODE_ENV].db.url,{ useNewUrlParser: true })
  await client.connect()

  const db = client.db(config[NODE_ENV].db.name);

  await resolvers({
    hemera,
    db
  })

  console.log("DB Service running successfully")
})

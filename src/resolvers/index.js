import { ObjectID } from 'mongodb'
const topic = 'db-service'

export default async ({ hemera, db }) => {
  hemera.add({
    topic,
    cmd: 'insert-one'
  }, async ({ collection, obj }) => {
    const { ops }= await db.collection(collection).insertOne(obj)
    return obj
  })

  hemera.add({
    topic,
    cmd: 'find'
  }, async ({ collection, params }) => {
    const q = Object.entries(params).reduce((acc,[ key, val ]) => {
      if(key==="_id"){
        return {
          ...acc,
          [key]: new ObjectID(val)
        }
      } else {
        return {
          ...acc,
          [key]: val
        }
      }
    }, {})
    const res = await db.collection(collection).find(q).toArray()
    return res
  })

  hemera.add({
    topic,
    cmd: 'find-one'
  }, async ({ collection, params }) => {
    console.log({ params })
    const [res] = await db.collection(collection).find(params).toArray()
    return res
  })

  hemera.add({
    topic,
    cmd: 'update-one'
  }, async ({ collection, params }) => {
    const { _id, ...restParams } = params

    const res = await db.collection(collection).updateOne({
       _id: new ObjectID(_id)
     }, {
       $set : restParams
     }).toArray()

     return res
  })

  hemera.add({
    topic,
    cmd: 'delete-one'
  }, async ({ collection, params }) => {
    await db.collection(collection).deleteOne(params)
    return { ok:true, message:"Deleted successfully"}
  })
}

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
    const [res] = await db.collection(collection).find(params).toArray()
    return res
  })

  hemera.add({
    topic,
    cmd: 'update-one'
  }, async ({ collection, params }) => {
    const { _id, ...restParams } = params

    const { value } = await db.collection(collection).findOneAndUpdate({
      _id: new ObjectID(_id)
    },{
      $set: restParams
    },{
      returnOriginal: false
    })

    return value
  })

  hemera.add({
    topic,
    cmd: 'delete-one'
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

    try{
      await db.collection(collection).deleteOne(q)
      return { ok:true, message:"Deleted successfully"}
    } catch(err){
      return { ok:false, message:`Error deleting: ${err.message}`}
    }
    
  })
}

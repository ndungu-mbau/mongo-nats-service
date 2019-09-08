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
    const res = await db.collection(collection).find(params).toArray()
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

    const res = await db.collection(collection).updateOne({
       _id
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

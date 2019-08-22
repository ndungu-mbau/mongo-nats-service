const { MONGO_URL: url } = process.env

export default {
  development:{
    db:{
      url,
      name:'minister_dev'
    },
    secret:"5q4twy5dtfyvrfrnpbiuywtdqvw5iryut",

  },
  production:{
    db:{
      url,
      name:'minister_prod'
    },
    secret:"4376ef468b37366a1253a426b566757edf8dd6a967b95b9b3b7970d3214ed34b"
  }
}

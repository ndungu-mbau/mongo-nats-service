const { MONGO_URL: url, SECRET: secret } = process.env

export default {
  development:{
    db:{
      url,
      name:'minister_dev'
    },
    secret,

  },
  production:{
    db:{
      url,
      name:'minister_prod'
    },
    secret
  }
}

const { MONGO_URL: url, SECRET: secret, NAME: name } = process.env

export default {
  development:{
    db:{
      url,
      name
    },
    secret,

  },
  production:{
    db:{
      url,
      name
    },
    secret
  }
}

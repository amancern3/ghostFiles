console.log("hello world");

const express = require('express')
const app = express()

require('dotenv').config()
const {readFile} = require('fs').promises

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config))

app.get('/', async (req, res) => {
    res.send(await readFile('./index.html', 'utf-8'))
})

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))
console.log("hello world");

const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '/Users/bitterfq/ghostFiles/ghostFiles/.env') })

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

app.use(express.static(__dirname + '/assets/css'))
app.use(express.static(__dirname + '/assets/images'))

app.get('/', async (req, res) => {
    console.log("Rendering index html......")
    res.send(await readFile('./index.html', 'utf-8'))
})

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))
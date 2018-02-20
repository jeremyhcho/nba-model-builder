require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const auth = require('http-auth')

const app = express()
const sslRedirect = require('heroku-ssl-redirect')

// API Proxy
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()

const port = process.env.PORT || 3002

const basic = auth.basic({
  realm: 'Secret'
}, (username, password, cb) => {
  cb(username === process.env.BASIC_USERNAME && password === process.env.BASIC_PASSWORD)
})

const basicMiddleware = auth.connect(basic)

app.use(cookieParser())
app.use(sslRedirect())

// Static Assets
app.use(express.static('dist'))

app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: process.env.API_HOST,
    changeOrigin: process.env.NODE_ENV == 'production'
  })
})

app.get('/styleguide', basicMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/styleguide.html'))
})

// Catch All
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(port, () => (
  console.info(`==> Express listening on port ${port}.`)
));

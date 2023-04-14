const express = require('express')
const router = require('./router')

const app = express()
const port = 3000

app.use(express.json())
router(app)

app.listen(port)
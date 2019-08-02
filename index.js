const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/data', db.getData)
app.get('/data/:id', db.getDataById)
app.post('/data', db.createData)
app.put('/data/:id', db.updateData)
app.delete('/data/:id', db.deleteData)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



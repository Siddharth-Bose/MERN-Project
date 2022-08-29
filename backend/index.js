const connectToMongo= require('./db');

connectToMongo();
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Sid!')
})

app.get('/Kajal', (req, res) => {
    res.send('Hello kajal!')
  })

app.get('/login', (req, res) => {
    res.send({user:"Sid12",pass:"bcrypt"})
  })

  app.get('/signup', (req, res) => {
    res.send({user:"Sid12",pass:"bcrypt",phone:"9304257445"})
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
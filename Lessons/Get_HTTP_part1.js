// import module: express
const express = require('express')
const app = express()
 
app.get('/say1', function (req, res) {
  res.send('Cat Lover v1')
})
// path type
app.get('/say/:name/:age', function (req, res) {
  res.send(`Hello ${req.params.name},  ${req.params.age}`)
})
// query string ต้องส่ง code ดักจับดีๆ http://localhost:3000/search?name=macbook&price=9999
app.get('/search', function (req, res) {
  res.send(`search: ${req.query.name}, ${req.query.price}`)
})

const port = 3000
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
    console.log('Press Ctrl + C to quit');
})
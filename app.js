// import module: express
const express = require("express");
const app = express();
const cors = require('cors');

var corsOptions = {
  origin: ['http://example.com','https://www.w3schools.com/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))



// middleware เพื่อเวลา post method จะได้รู้ว่าเราใช้ .json()
app.use(express.json());

// ย้ายเข้า Route
app.use(require('./src/routes/routes'))

// ส่ง path เข้า static ---> http://localhost:3000/image/image-1624332796995.png
app.use('/image', express.static('./images'))


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
  console.log("Press Ctrl + C to quit");
});

require('dotenv').config();
const express = require('express')
const app = express();
const PORT = process.env.PORT

app.use(express.static(__dirname + '/../client/dist'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
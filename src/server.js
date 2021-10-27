const express = require('express');
const cors = require('cors');
const routes = require('./routes')

var corsOptions = {
    origin: '*',
  }

const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)



app.get('/', (request, response) => {
    return response.json({ message: 'server connected' })
})

app.listen(4000, () => {
    console.log("Server is runing Port 4000")
})

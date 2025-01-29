const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const router = require('./routes')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));



app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(router);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

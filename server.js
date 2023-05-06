require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const thoughts = require('./routes/api/thoughts')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

console.log(process.env.NODE_ENV)

const db = require('./config/connection')

// routes
app.use('/api/users', users)
app.use('/api/thoughts', thoughts)
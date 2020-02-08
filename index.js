'use strict';
const server = require('../lib/server.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const MONGODB_URI = 'mongodb://localhost:27017/lab09';


dotenv.config();


const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, mongooseOptions);

server.start(process.env.PORT);
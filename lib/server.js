/* eslint-disable no-unused-vars */
'use strict';
//3d party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// custom routes
const myRoute = require('../routes/v1.js');


// applications constants 
const app = express();

// 3d party middleware 
app.use(express.json());

// 3d party dependencies
app.use(cors());
app.use(morgan('dev'));


app.use(myRoute);
app.use(errorHandler);


// middleware 500 error function
function errorHandler(err , req , res , next){
  res.status(500);
  res.statusMessage = 'erroe ! (500)';
  res.json({error : err});
}


module.exports = {
  server : app ,
  start : (port) => {
    let PORT = port || process.env.PORT || 3000 ;
    // prove of life !
    app.listen(PORT ,()=> {
      console.log(`i am here ${PORT}!!! `);
    });
  },
};
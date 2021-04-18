const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose')

const routerV1 = require('./routers/index');

const app = express();

//body json ->Middelware Para poder enviar data 
app.use(express.json());

//Middelware - file upload

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024},
}));

routerV1(app);

//handler
app.use(function(err, req, res, next) {

  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({
    message: message,
    data: data
  })
  
})

mongoose.connect('mongodb://localhost/node5Gen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then ( () => {
    console.log('Mongo ok')
})

app.listen(8080, () => {
    console.log('Servidor ok 8080');
})
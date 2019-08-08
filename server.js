const express = 'express';

const server = require('express').Router();

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>this is middleware!</h2>`)
});

//custom middleware

//be careful with hoisting. Below is written as a function, so it can be called whereever in the file
// if it was this function logger = () => 
// this is an functional expression, so it MUST be hoisted above wherever it gets called. 
function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log(`you made a ${method} request to ${url}`);
  next();
}


module.exports = server;

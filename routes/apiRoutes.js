//const router = require('express').Router();
//const fs = require('fs');
// const { promisify } = require('util');
// const readFileAsync = promisify(fs.readFile);

const contactsRoutes = require('./contacts');



const appRouter = (app, fs) => {
  app.get('/api', (req, res) => {
    res.send('welcome to the development api-server');
  });
  
  contactsRoutes(app, fs);

};

module.exports = appRouter;
const contactsRoutes = require('./contacts');

const appRouter = (app, fs) => {
  app.get('/api', (req, res) => {
    res.send('welcome to the development api-server');
  });

  contactsRoutes(app, fs);

};

module.exports = appRouter;
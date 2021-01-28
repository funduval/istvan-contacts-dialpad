const contactsRoutes = (app, fs) => {
    const dataPath = './public/data/contacts.json';
  
    app.get('/api/contacts', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = contactsRoutes;
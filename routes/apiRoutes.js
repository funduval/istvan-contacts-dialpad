const router = require('express').Router();
const directory = require('../db/Directory');

router.get('/api/contacts', (req, res) => {
  directory
    .getContacts()
    .then((contacts) => {
        console.log(contacts)
      return res.json(contacts);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

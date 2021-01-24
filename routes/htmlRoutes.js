const path = require('path');
const router = require('express').Router();

router.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contacts.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;

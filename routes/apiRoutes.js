const router = require('express').Router();
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const DictionaryTrie  = require('../public/js/dictionary');


router.get('/api/contacts', (req, res) => {
  createDictionary = async () => {

    let alphabetical = new DictionaryTrie();
    let numeric = new DictionaryTrie();

    try {
    let list = await readFileAsync('public/data/contacts.json', 'utf-8');
    let contacts = JSON.parse(list);
    contacts.forEach((contact)=>alphabetical.add(contact.name));
    contacts.forEach((contact)=>numeric.add(contact.number));
    console.log("alphabetical",alphabetical)
    return alphabetical;
        
    }
    catch(err) {
        console.log("Error: ", err.message);

    }
      
}; 
    createDictionary()
    .then((contacts) => {
        console.log("contacts",contacts)
      return res.json(contacts);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

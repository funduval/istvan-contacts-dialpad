const fs = require('fs');
const Contact = require('./Contact')
const { promisify } = require('util');
const uuidv1 = require('uuid');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);


class Directory {
    read() {
      return readFileAsync('./contacts.json', 'utf8');
    }
  
    // write(contact) {
    //   return writeFileAsync('./contacts.json','utf8');
    // }
  
    getContacts() {
      return this.read().then((contacts) => {
        let parsedContacts;
  
        try {
          parsedContacts = JSON.parse(contacts);
          console.log("parsedContacts",parsedContacts)
        } catch (err) {
          parsedContacts = [];
          console.log("parsedContacts",parsedContacts)

        }       
        
      });
    } 
  }

module.exports = new Directory();



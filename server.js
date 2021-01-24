const fs = require('fs');
const Contact = require('./data/Contact');
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const getNewEntry = () => {
    
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(new Contact("Trudy", "555-555-5555"));
            reject(new Error('could not retrieve contact'));
        }, 500);
    });
}

const run = async () => {
    try {
    let list = await readFileAsync('./contacts.txt', 'utf-8');
    let contact = await getNewEntry();
        
    list=list+`\n${contact.name}, ${contact.number}`;
    let log = await writeFileAsync('./data/contacts.json', list, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

    }
    catch(err) {
        console.log("Error: ", err.message);

    }
}

run();
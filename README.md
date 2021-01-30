# Contacts Dialpad

Contacts Dialpad is a phone dialpad tool that can search based on names and numbers.

<img src="https://dialpad-images.s3.amazonaws.com/dialpad.png" width="210" height="300">

## Installation

Use the package manager npm

```bash
npm install 
```

## Usage

```bash
npm start
```

```
In your browser, visit localhost:3000
```

### TODO:

* Render list in numeric mode.
* Fix the prefix function in the trie. 
* Render everything sorted that matched prefix criteria. 
* Remove isWord criteria.
* Refactor to a more "React-like" use of components. 
* Orchestrate components according to lifecycle/data changes.
* Z seems is missing from dialpad.

### FUNCTIONALITY: 

* BE SURE TO: toggle slider to "By Name" first.
* Reads data from json file in directory.
* Sends data to /api/contacts endpoint.
* Retrieves data for the DOM from /api/contacts endpoint.
* You can type numbers and output all possible string combinations.
* You can toggle between name and number.
* You can enter a WHOLE NAME and retrieve that name first in the list, with the remainder of the list sorted. 


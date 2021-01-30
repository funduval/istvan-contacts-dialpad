# Contacts Dialpad

contacts-dialpad is a phone dialpad tool that can search based on names and numbers.


## Installation

Use the package manager npm

```bash
npm install 
```

## Usage

```bash
npm start
```

## Incomplete

It looks pretty, but...

TODO: 
* render list in numeric mode
* fix the prefix function in the trie, then 
* render everything sorted that matched prefix criteria 
* remove isWord criteria, but alas I didn't complete the challenge.
* refactor to a more "React-like" use of components 
* orchestrate components according to lifecycle/data changes.
* Z seems is missing from dialpad

FUNCTIONALITY: 
* BE SURE TO: toggle slider to "By Name" first.
* you can type numbers and output all possible string combinations
* can toggle between name and number
* can enter a WHOLE NAME and retrieve that name first in the list, with the remainder of the list sorted. 


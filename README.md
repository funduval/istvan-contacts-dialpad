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

TODO: my goal was to fix the prefix function in the trie, then render everything sorted that matched prefix criteria not whole word criteria, but alas I didn't complete the challenge.

TODO: Too much code, and I wish I could have finished and then refactored to a more "React-like" use of components in JS that can be orchestrated according to lifecycle/data changes.

TODO: Z seems to be missing from dialpad. A bug I noticed after submitting.

FUNCTIONALITY: The only functionality that works is: you can type numbers, can toggle between name and number, can enter a WHOLE NAME and retrieve that name first in the list, with the remainder of the list sorted. BE SURE TO: toggle slider to "By Name" first.


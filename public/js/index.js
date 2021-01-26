
class DialPad {
  constructor(rangeNumber){
    let array = [...Array(rangeNumber).keys(),"10","*","#"];
    let cleanedArray = array.slice(1);
    this.numbers = cleanedArray;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  }

  assignButtonsValues(){
      const allButtonValues = [];
      const valuesToAssign = this.alphabet.split('');
      let index = 0;
      let buttonsAssigned = new Map();
      let number = 2;
     
      while (index <= valuesToAssign.length+1) {
        if(this.numbers[number] === 8 || this.numbers[number] === 10){
           let size=4
            allButtonValues.push(valuesToAssign.slice(index, index + size));
            buttonsAssigned[number] = valuesToAssign.slice(index, index + size) || [];
            index += size;

          } else {
           let size=3;
              allButtonValues.push(valuesToAssign.slice(index, index + size));
              buttonsAssigned[number] = valuesToAssign.slice(index, index + size)|| [];
              index += size;

          }    
          number++;
      }

      buttonsAssigned["1"]=[""]
      buttonsAssigned["10"]=[""]
      buttonsAssigned["*"]=[""]
      buttonsAssigned["#"]=[""]

      console.log(buttonsAssigned)
    
      return buttonsAssigned;
  
  }
}



document.body.onload = function(){
  const dialpad =  new DialPad(10)
  let registry = dialpad.assignButtonsValues();

  console.log("dialpad registry",registry);
  drawButtonElements(2,registry);
};


function drawButtonElements (number, registry) {
  class DialpadButton extends HTMLButtonElement {
    constructor() {
      super();

    }
  }

   customElements.define('dialpad-button', DialpadButton, { extends: "button" });

   for(index in registry){   
    let dialpadButton = document.createElement('button', { is : 'dialpad-button' });

        dialpadButton.setAttribute('letterString', registry[index].join(" "));
        dialpadButton.setAttribute('numberString', index);
        dialpadButton.setAttribute('role', 'dial');
        dialpadButton.setAttribute('class', 'dial-btn');

        let assignedNumber = document.createElement('span');
        assignedNumber.setAttribute('class','numbers');

        let letterString = dialpadButton.getAttribute('letterString') || 'X X X';
        let numberString = dialpadButton.getAttribute('numberString') === '10' ? '0' : dialpadButton.getAttribute('numberString');

        let assignedLetters = document.createElement('span');

        assignedNumber.innerHTML = numberString
        assignedLetters.innerHTML = letterString ;

        assignedLetters.setAttribute('class','letterString');
        dialpadButton.appendChild(assignedNumber);
        dialpadButton.appendChild(assignedLetters);

        let numbersRow = document.getElementById("pad");

        //handle keys that have no letters. Would like to makethis more dynamic;

        if (index==="1"){
          dialpadButton.setAttribute('id', 'one');
          numbersRow.appendChild(dialpadButton);   
          
        } else if (index==="*"){
          dialpadButton.setAttribute('id', "star");
          let ten = document.getElementById('ten');
          console.log("ten", ten);
          numbersRow.insertBefore(dialpadButton,ten);   
          
        } else if (index==="10"){
          dialpadButton.setAttribute('id', "ten");
          numbersRow.appendChild(dialpadButton);   
          
        }  else if(index==="#"){
          dialpadButton.setAttribute('id', "pound");
          numbersRow.appendChild(dialpadButton);   
          
        } else {
          dialpadButton.setAttribute('id', registry[index].join("_"));
          numbersRow.appendChild(dialpadButton);   
        }            
      }
}

class Node {
  constructor(){
    this.keys = new Map();
    this.end = false;
    this.setEnd = function() {
      this.end = true;
    };
    this.isEnd = function() {
      return this.end;
    };
  }
};

class Trie {

	constructor(){
    this.root = new Node();
  

	this.add = function(input, node = this.root) {
		if (input.length == 0) {
			node.setEnd();
			return;
		} else if (!node.keys.has(input[0])) {
			node.keys.set(input[0], new Node());
			return this.add(input.substr(1), node.keys.get(input[0]));
		} else {
			return this.add(input.substr(1), node.keys.get(input[0]));
		};
	};

	this.isWord = function(word) {
		let node = this.root;
		while (word.length > 1) {
			if (!node.keys.has(word[0])) {
				return false;
			} else {
				node = node.keys.get(word[0]);
				word = word.substr(1);
			};
		};
		return (node.keys.has(word) && node.keys.get(word).isEnd()) ? 
      true : false;
	};

	this.print = function() {
		let words = new Array();
		let search = function(node, string) {
			if (node.keys.size != 0) {
				for (let letter of node.keys.keys()) {
					search(node.keys.get(letter), string.concat(letter));
				};
				if (node.isEnd()) {
					words.push(string);
				};
			} else {
				string.length > 0 ? words.push(string) : undefined;
				return;
			};
		};
		search(this.root, new String());
		return words.length > 0 ? words : mo;
  };
 
  
}

};


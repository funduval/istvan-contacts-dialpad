class DialPad {
  constructor(rangeNumber) {
    let array = [...Array(rangeNumber).keys(), "10", "*", "#"];
    let cleanedArray = array.slice(1);
    this.numbers = cleanedArray;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  }

  assignButtonsValues() {
    const allButtonValues = [];
    const valuesToAssign = this.alphabet.split('');
    let index = 0;
    let buttonsAssigned = new Map();
    let number = 2;

    while (index <= valuesToAssign.length + 1) {
      if (this.numbers[number] === 8 || this.numbers[number] === 10) {
        let size = 4
        allButtonValues.push(valuesToAssign.slice(index, index + size));
        buttonsAssigned[number] = valuesToAssign.slice(index, index + size) || [];
        index += size;

      } else {
        let size = 3;
        allButtonValues.push(valuesToAssign.slice(index, index + size));
        buttonsAssigned[number] = valuesToAssign.slice(index, index + size) || [];
        index += size;

      }
      number++;
    }

    buttonsAssigned["1"] = [""]
    buttonsAssigned["10"] = [""]
    buttonsAssigned["*"] = [""]
    buttonsAssigned["#"] = [""]

    //console.log("buttonsAssigned", buttonsAssigned)

    return buttonsAssigned;

  }
}

function drawButtonElements(number, registry) {
  class DialpadButton extends HTMLButtonElement {
    constructor() {
      super();

    }
  }

  customElements.define('dialpad-button', DialpadButton, { extends: "button" });

  for (index in registry) {
    let dialpadButton = document.createElement('button', { is: 'dialpad-button' });

    dialpadButton.setAttribute('letters', registry[index].join(" "));

    if (parseInt(index) < parseInt('10')) {
      dialpadButton.setAttribute('number', index)
    } else if (parseInt(index) == parseInt('10')) {
      dialpadButton.setAttribute('number', (parseInt(index) % 10).toString())
    } else {
      index === "*" ? dialpadButton.setAttribute('number', "*") : dialpadButton.setAttribute('number', "#")

    }

    dialpadButton.setAttribute('role', 'dial');
    dialpadButton.setAttribute('class', 'dial-btn');

    let assignedNumber = document.createElement('span');
    assignedNumber.setAttribute('class', 'number-span');

    let letterString = dialpadButton.getAttribute('letters') || 'X X X';
    let numberString = dialpadButton.getAttribute('number');

    let assignedLetters = document.createElement('span');

    assignedNumber.innerHTML = numberString
    assignedLetters.innerHTML = letterString;

    assignedLetters.setAttribute('class', 'letter-span');
    dialpadButton.appendChild(assignedNumber);
    dialpadButton.appendChild(assignedLetters);

    let numbersRow = document.getElementById("pad");

    //handle keys that have no letters. Would like to makethis more dynamic;

    if (index === "1") {
      dialpadButton.setAttribute('id', 'one');
      numbersRow.appendChild(dialpadButton);

    } else if (index === "*") {
      dialpadButton.setAttribute('id', "star");
      let zero = document.getElementById('zero');
      numbersRow.insertBefore(dialpadButton, zero);

    } else if (index === "10") {
      dialpadButton.setAttribute('id', 'zero');
      numbersRow.appendChild(dialpadButton);

    } else if (index === "#") {
      dialpadButton.setAttribute('id', "pound");
      numbersRow.appendChild(dialpadButton);

    } else {
      dialpadButton.setAttribute('id', registry[index].join("_"));
      numbersRow.appendChild(dialpadButton);
    }
  }
}
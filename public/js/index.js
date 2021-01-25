
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
  addButtonElement(2,registry);
};


function addButtonElement (number, registry) {
  class DialpadButton extends HTMLButtonElement {
    constructor() {
      super();

    }
  }

   customElements.define('dialpad-button', DialpadButton, { extends: "button" });
   let cached;


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
        let dummyRow = document.getElementById("dummy-btns");
        let numbersRow = document.getElementById("pad");

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

      console.log("cached", cached.getAttribute('id'));

}

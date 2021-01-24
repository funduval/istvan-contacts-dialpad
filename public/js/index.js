
document.body.onload = addElement;
 
 function addElement () {
  class SuperParagraph extends HTMLParagraphElement {
    constructor() {
      super();

    }
  }

  customElements.define('super-paragraph', SuperParagraph, { extends: "p" });

  let superParagraph = document.createElement('p', { is : 'super-paragraph' });

   const newContent = document.createTextNode("Hi there and greetings!");
 
   superParagraph.appendChild(newContent);
 
   const currentDiv = document.getElementById("x");
   currentDiv.appendChild(superParagraph);

}
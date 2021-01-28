
document.body.onload = function(){
  //fetch('./api/contacts').then(r => console.log(r))

  const dialpad =  new DialPad(10)
  let registry = dialpad.assignButtonsValues();
  
  drawButtonElements(2,registry);



  let str="";

  const inputHandler = function(e) {
    const buildInputString = (char) =>{
      console.log("str",str);
      str+=char;
      return str;

    }

    let parent = e.target.parentNode;

    console.log("parent",parent);

    let letters = parent.getAttribute('letters');
    let numbers = parent.getAttribute('numbers');
    
    if((!numbers || !letters) || letters.length === 0 || numbers.length === 0){
      return
    } if(parent.getAttribute('class') === 'image-wrapper'){
      numbers = numbers.substr(1,numbers.length)
      typed.innerHTML = buildInputString(numbers);
    } else if(parent.getAttribute('class') === 'image-wrapper'){
      numbers = numbers.substr(1,numbers.length)
      typed.innerHTML = buildInputString(numbers);
    }else{
      typed.innerHTML = buildInputString(numbers);
    }
  }

  const delegateEvents = (el, evt, sel, handler) => {
    el.addEventListener(evt, function(event) {
        var t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
  }

  delegateEvents(document, 'click', '.dial-btn', inputHandler);
  delegateEvents(document, 'click', '#delete-btn', inputHandler)

}
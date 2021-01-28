document.body.onload = function(){

  let str="";
  const dialpad =  new DialPad(10)
  let registry = dialpad.assignButtonsValues();


  const getContacts = async () => {
    const response = await fetch('/api/contacts');
    const result = await response.json();
    
    let names = [];
    let numbers = [];
    let images = [];
    
    for(let item of result.data){
      names.push(item.name);
      numbers.push(item.number);
      images.push(item.imgUrl);

    }
    drawContacts(names, numbers, images);
    console.log(names)

}


const drawContacts = (names, numbers, images) => {
  for(let k=0;k<names.length;k++){
    let resultsList = document.getElementById('results')
    let resultsListItem = document.createElement('li');
    let resultsName = document.createElement('span');

    resultsListItem.setAttribute('class','list-detail');
    resultsName.setAttribute('class','list-name');
    resultsName.innerHTML = names[k];
    resultsListItem.appendChild(resultsName);


    let avatar = document.createElement('img');
    avatar.setAttribute('src',images[k]);
    console.log("images[k]", images[k]);
    avatar.setAttribute('class','avatar');
    resultsListItem.appendChild(avatar)

    let phoneNumber = document.createElement('span');
    phoneNumber.setAttribute('class','list-number');
    phoneNumber.innerHTML = numbers[k];
    resultsListItem.appendChild(phoneNumber)

    resultsList.appendChild(resultsListItem);

  }
}

const inputHandler = function(e) {
  const buildInputString = (char) =>{
    console.log("str",str);
    str+=char;
    return str;

  }

  let parent = e.target.parentNode;

  console.log("parent", parent);

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


  
  getContacts();
  drawButtonElements(2,registry);
  delegateEvents(document, 'click', '.dial-btn', inputHandler);
  delegateEvents(document, 'click', '#delete-btn', inputHandler)

}
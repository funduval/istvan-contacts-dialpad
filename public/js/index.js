document.body.onload = function(){

  let str="";
  const dialpad =  new DialPad(10)
  const registry = dialpad.assignButtonsValues();
  const alpha = new DictionaryTrie();
  const numeric = new DictionaryTrie();

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
    const library = await createDictionaries(names, numbers);
    dialAndSearch(library,result.data);

}

const createDictionaries = async (names,numbers) => {
  const tries={}; 

  const populate = async (names,numbers) => {
    for(let n=0;n<names.length; n++){
    alpha.add(names[n].toLowerCase().replace(/\s/g,""));    

    numeric.add((numbers[n].replace(/\-/g,'')));

   
  }
}


  await populate(names, numbers);

  tries["alpha"] = alpha;
  tries["numeric"] = numeric;

  return tries;
}


const drawContacts = (names, numbers, images) => {
  for(let k=0;k<names.length;k++){
    
    let resultsList = document.getElementById('results')
    let resultsListItem = document.createElement('li');
    let resultsName = document.createElement('span');

    resultsListItem.setAttribute('class','list-detail');
    resultsName.setAttribute('class','list-name');
    resultsName.setAttribute('id',names[k].toLowerCase().replace(/\s/g,""));

    
    resultsName.innerHTML = names[k];
    resultsListItem.appendChild(resultsName);

    let avatar = document.createElement('img');
    avatar.setAttribute('src',images[k]);
    avatar.setAttribute('class','avatar');
    resultsListItem.appendChild(avatar)

    let phoneNumber = document.createElement('span');
    phoneNumber.setAttribute('class','list-number');
    phoneNumber.innerHTML = numbers[k];
    resultsListItem.appendChild(phoneNumber)

    resultsList.appendChild(resultsListItem);

  }
}

getContacts();
drawButtonElements(2,registry);

const dialAndSearch=(library,data)=>{

  const{alpha, numeric} = library;
  let mode = "by number";


  const inputHandler = function(e) {
    let parent = e.target.parentNode;
    if(parent.getAttribute('class') === 'switch'){ 
      var checkbox = $('.switch input[type="checkbox"]');
    if ($(checkbox).prop('checked')) {
      mode="by number"
      console.log("Was Checked", mode);
    } else {
      mode="by name"
      console.log("Was Not Checked", mode);
    }}

    if(mode==="by name"){
    const numberToLetterCombos = (digits) => {
      let nums = digits.split('').filter((char) => {
        if (!([ "-", "0", "1", "*", "#"].includes(char))){
          return char;
        } else {
          return 
        }
    });
      if(!nums.length) return [];
      
      let map = {
          2: ['a', 'b', 'c'],
          3: ['d', 'e', 'f'],
          4: ['g', 'h', 'i'],
          5: ['j', 'k', 'l'],
          6: ['m', 'n', 'o'],
          7: ['p', 'q', 'r', 's'],
          8: ['t', 'u', 'v'],
          9: ['w', 'x', 'y', 'z']
      }
      
      let combinations = [];
      let candidates = [];
      
      function associate(string, index) {
          if(index === nums.length) {
              combinations.push(string);
              return;
          }
          
          for(let x of map[nums[index]]) {
              associate(string+x, index+1);
          }
      }

      associate('', 0);
     
      combinations.forEach((word)=>{
        if(alpha.isWord(word)){
          candidates.push(word)
        }else{
          return
        }
      });
      
      candidates.forEach((str) => {
        let contacts=[];
        let name = str.replace(/\b[a-z](?=[a-z]{2})/g, function(letter) {
          return letter.toUpperCase(); } );

        let target = data.find((item) => {
          console.log("item",item);
          console.log("name",name)
          return item["name"] === name;
        });
        let index = data.indexOf(target);
        let remaining = data.slice(index+1).sort();

        console.log("target", target)
        contacts.push(target);
        contacts.push(...remaining);

        console.log("remaining", remaining);


        document.getElementById('results').innerHTML="";
        document.getElementById('results').style="background-color:white";


        console.log(contacts)
        for(let contact of contacts){
          let resultsList = document.getElementById('results')
          let resultsListItem = document.createElement('li');
          let resultsName = document.createElement('span');

          resultsListItem.setAttribute('class','list-detail');
          resultsName.setAttribute('class','list-name');
          resultsName.setAttribute('id',contact["name"].toLowerCase().replace(/\s/g,""));

          
          resultsName.innerHTML = contact["name"];
          resultsListItem.appendChild(resultsName);

          let avatar = document.createElement('img');
          avatar.setAttribute('src',contact["imgUrl"]);
          avatar.setAttribute('class','avatar');
          resultsListItem.appendChild(avatar)

          let phoneNumber = document.createElement('span');
          phoneNumber.setAttribute('class','list-number');
          phoneNumber.innerHTML = contact["number"];
          resultsListItem.appendChild(phoneNumber)

          resultsList.appendChild(resultsListItem);


        }

      });

      return combinations;

    };

    const buildInputString = (char, del) =>{
      let combos=[];
      if(str.length <= 11){
        if (str.length === 3 && !del) str += '-';
        if (str.length === 7 && !del) str += '-';
        if(del){
          let editedString = str.slice(0,str.length-1);
          str=editedString;

          combos.pop();
          let mappedCombinations = numberToLetterCombos(editedString);
          combos.push(...mappedCombinations);

          return str;

        }else {
          str+=char;
          
          if(parseInt(char) > 1 && parseInt(char) <= 9){
          combos.push(...numberToLetterCombos(str));

          }

          return str;

        }
      }else{
        str="";
        return null;

      };
    }

      let number = parent.getAttribute('number');
      
      if(parent.getAttribute('class') === 'delete-image-wrapper'){
        let del = true;
        typed.innerHTML = buildInputString(number,del);
      }else if (parent.getAttribute('class') === 'dial-btn'){
        let del = false;
        typed.innerHTML = buildInputString(number,del);
        typed.style.letterSpacing = '5px';

      }
    } else if (mode == "by number"){

       const buildString = (char, del) =>{
        let arr=[];
        if(str.length <= 11){
          if (str.length === 3 && !del) str += '-';
          if (str.length === 7 && !del) str += '-';
          if(del){
            let editedString = str.slice(0,str.length-1);
            str=editedString;
  
            arr.pop();
            arr.push(str);
            return str;
  
          }else {
            str+=char;
            console.log("str",str)
            
            if(parseInt(char) > 1 && parseInt(char) <= 9){
            arr.push(str);
  
            }
            return str;
  
          }
        }else{
          str="";
          return null;
  
        };
      }
  let phoneValue;
  console.log(phoneValue);




        let number = parent.getAttribute('number');
        
        if(parent.getAttribute('class') === 'delete-image-wrapper'){
          let del = true;
          typed.innerHTML = buildString(number,del);
        }else if (parent.getAttribute('class') === 'dial-btn'){
          let del = false;
          typed.innerHTML = buildString(number,del);
          typed.style.letterSpacing = '5px';
  
        }

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

    delegateEvents(document, 'click', 'input[type="checkbox"]', inputHandler);
    delegateEvents(document, 'click', '.dial-btn', inputHandler);
    delegateEvents(document, 'click', '#delete-btn', inputHandler);

  }

}
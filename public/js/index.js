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
    dialAndSearch(library);

}

const createDictionaries = async (names,numbers) => {
  const tries={}; 

  const populate = async (names,numbers) => {
    for(let n=0;n<names.length; n++){
    alpha.add(names[n].toLowerCase().replace(/\s/g,""));    

    numbers[n].replace(/\-/g,'').split('').forEach(num => {
      numeric.add(num);
    });
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

const dialAndSearch=(library)=>{

  const{alpha, numeric} = library;

  const inputHandler = function(e) {
    let parent = e.target.parentNode;

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
        if(word==="unclemike") console.log ("alpha.is",alpha.isWord(word));

        if(alpha.isWord(word)){
          candidates.push(word);
        }
      
      });
      console.log("candidates",candidates)


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
          console.log("combos in deletion", combos );

          return str;

        }else {
          str+=char;
          
          if(parseInt(char) > 1 && parseInt(char) <= 9){
          combos.push(...numberToLetterCombos(str));
          console.log("combos in addition", combos );
          }

          return str;

        }
      }else{
        str="";
        return null;

      };
    }

      let letters = parent.getAttribute('letters');
      let number = parent.getAttribute('number');
      
      if(parent.getAttribute('class') === 'delete-image-wrapper'){
        let del = true;
        typed.innerHTML = buildInputString(number,del);
      }else{
        let del = false;
        typed.innerHTML = buildInputString(number,del);
        typed.style.letterSpacing = '5px';

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

    delegateEvents(document, 'onchange', 'input:checkbox', inputHandler);
    delegateEvents(document, 'click', '.dial-btn', inputHandler);
    delegateEvents(document, 'click', '#delete-btn', inputHandler);

  }
}
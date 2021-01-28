
class DictionaryNode {
    constructor(){
      this.children = new Map();
      this.end = false;
      this.setEnd = function() {
        this.end = true;
      };
      this.isEnd = function() {
        return this.end;
      };
    }
  };
  
class DictionaryTrie {
    constructor(values=[]){
    this.root = new DictionaryNode();
    this.values = values;
    }

    add (input, node = this.root) {
        if (input.length == 0) {
            node.setEnd();
            return;
        } else if (!node.children.has(input[0])) {
            node.children.set(input[0], new DictionaryNode());
            return this.add(input.substr(1), node.children.get(input[0]));
        } else {
            return this.add(input.substr(1), node.children.get(input[0]));
        };
    };

    numbersToLetters(digits) {
        let nums = digits.split('');

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
        
        let result = [];
        
        function associate(string, index) {
            if(index === nums.length) {
                result.push(string);
                return;
            }
            
            for(let x of map[nums[index]]) {
                associate(string+x, index+1);
            }
        }
        associate('', 0);
        return result;
    };
    
    isWord (word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.children.has(word[0])) {
                return false;
            } else {
                node = node.children.get(word[0]);
                word = word.substr(1);
            };
        };
        return (node.children.has(word) && node.children.get(word).isEnd()) ? 
    true : false;
    };

    print () {
        let words = new Array();
        let search = function(node, string) {
            if (node.children.size != 0) {
                for (let letter of node.children.keys()) {
                    search(node.children.get(letter), string.concat(letter));
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
        return words.length > 0 ? words : "no words to print";
    };

    openSearch(word) {
        var node = this.root;
        for(var i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
            node = node.children[word[i]];
            } else {
            return false;
            }
        }
        return node.end;
    };
};

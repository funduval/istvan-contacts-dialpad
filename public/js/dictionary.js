
class DictionaryNode {
    constructor() {
        this.children = new Map();
        this.end = false;
        this.setEnd = function () {
            this.end = true;
        };
        this.isEnd = function () {
            return this.end;
        };
    }
};

class DictionaryTrie {
    constructor() {
        this.root = new DictionaryNode();
    }

    add(input, node = this.root) {
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


    isWord(word) {
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

    print() {
        let words = new Array();
        let search = function (node, string) {
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

    searchNode(word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
                node = node.children[word[i]];
            } else {
                return false;
            }
        }
        return node
    };

    startsWith(prefix) {
        const node = this.searchNode(prefix);
        if (node == null) {
            return false;
        } else {
            return true;
        }
    }
};

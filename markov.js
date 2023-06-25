/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordsPattern = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (wordsPattern.has(currWord)) {
        wordsPattern.get(currWord).push(nextWord);
      } else {
        wordsPattern.set(currWord, [nextWord]);
      }
    }
    this.wordsPattern = wordsPattern;
  }

  static random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.wordsPattern.keys());
    let key = MarkovMachine.random(keys);
    let result = [];

    while (result.length < numWords && key !== null) {
      result.push(key);
      key = MarkovMachine.random(this.wordsPattern.get(key));
    }
    return result.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};

const sen = new MarkovMachine(
  "My name is Shahab and I wanna know what is new about me and my wife, Neda"
);
sen.makeChains();
const x = sen.makeText();
console.log(x);

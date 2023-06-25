/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// Make Markov machine from text and generate text from it
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

// read file and generate text
function makeText(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

// Read URL and mae text from it
async function makeURL(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  generateText(resp.data);
}

/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}

const fs = require('fs');
fs.readFile('inputJens.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});


function parseFile(fileData) {
  sum = 0;
  fileData.split(/\r?\n/).forEach((line) => {
  });   
}

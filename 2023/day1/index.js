const fs = require('fs');
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  parseFile(data);
});

const validDigits = [
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
];

function parseFile(fileData) {
  let sum = 0;

  fileData.split(/\r?\n/).forEach((line) => {
    let first_interger = null;
    let last_interger = null;

    for (let i = 0; i < line.length; i++) {
      const substring = line.substring(i);

      validDigits.forEach((digit) => {
        if (substring.startsWith(digit[0])) {
          first_interger = digit[1] * 10;
          return;
        }
      });

      if (first_interger !== null) {
        break;
      }
    }

    for (let i = line.length; i >= 0; i--) {
      const substring = line.substring(0, i);
      validDigits.forEach((digit) => {
        if (substring.endsWith(digit[0])) {
          last_interger = digit[1];
          return;
        }
      });

      if (last_interger !== null) {
        break;
      }
    }

    const value = first_interger + last_interger;

    sum += value;
  });
}

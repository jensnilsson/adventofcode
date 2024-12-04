const fs = require('fs');
fs.readFile('inputAlex.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let answer = 0;

  fileData.split(/\r?\n/).forEach((line, index) => {
    const values = line.split(' ').map(Number);

    const safe = isSafe(values);
    answer += safe ? 1 : 0;
  });

  console.log('answer', answer);
}

function isSafe(values) {
  const isIncrease = isIncreasing(values[0], values[1]);

  for (let i = 0; i < values.length - 1; i++) {
    diff = isIncrease ? values[i + 1] - values[i] : values[i] - values[i + 1];
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
}

function isIncreasing(first, second) {
  return first < second;
}

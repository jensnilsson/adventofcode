const fs = require("fs");
fs.readFile("inputJens.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let answer = 0;

  fileData.split(/\r?\n/).forEach((line, row) => {
    const values = line.split(" ").map(Number);
    let isIncrease;
    const isSafe = values.every((value, index) => {
      if (index === 0) {
        return true;
      }
      const previousValue = values[index - 1];
      if (index === 1) {
        const diff = Math.abs(previousValue - value);
        // console.log({ previousValue, value, diff });
        return diff > 0 && diff < 4;
      }
      if (index > 1) {
        isIncrease = values[index - 2] < previousValue;
        diff = isIncrease ? value - previousValue : previousValue - value;
        //console.log({ previousValue, value, diff, isIncrease });
        return diff > 0 && diff < 4;
      }
    });
    console.log(row, isSafe);
    answer += isSafe;
  });

  console.log("answer", answer);
}

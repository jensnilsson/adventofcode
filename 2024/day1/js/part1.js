const fs = require("fs");
fs.readFile("inputJens.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let firstColumn = [];
  let secondColumn = [];
  fileData.split(/\r?\n/).forEach((line) => {
    const parts = line.split(/\s+/);
    firstColumn = [...firstColumn, parts[0]];
    secondColumn = [...secondColumn, parts[1]];
  });

  const sortedFirstColumn = firstColumn.sort((a, b) => a - b);
  const sortedSecondColumn = secondColumn.sort((a, b) => a - b);

  const answer = sortedFirstColumn.reduce(
    (acc, curr, index) => (acc += Math.abs(curr - sortedSecondColumn[index])),
    0
  );

  console.log("answer", answer);
}

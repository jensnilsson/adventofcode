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
    firstColumn = [...firstColumn, Number(parts[0])];
    secondColumn = [...secondColumn, Number(parts[1])];
  });

  const sum = firstColumn.reduce((acc, curr) => {
    const count = secondColumn.filter((item) => item === curr).length;
    return (acc += curr * count);
  }, 0);

  console.log("sum", sum);
}

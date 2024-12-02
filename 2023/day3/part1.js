const { log } = require("console");
const fs = require("fs");
fs.readFile("inputJens.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let partNumbers = [];
  let currentPartNumber = null;
  let symbols = [];
  let totalRows = 0;
  let totalColumns = 0;

  console.log("Input:");
  fileData.split(/\r?\n/).forEach((line, rowIndex) => {
    totalRows++;
    for (let colIndex = 0; colIndex < line.length; colIndex++) {
      const num = parseInt(line[colIndex]);
      totalColumns = Math.max(colIndex, totalColumns);
      if (!isNaN(num)) {
        if (currentPartNumber) {
          currentPartNumber.value = currentPartNumber.value * 10 + num;
        } else {
          currentPartNumber = {
            value: num,
            rowIndex,
            colIndex,
          };
          partNumbers = [...partNumbers, currentPartNumber];
        }
      } else {
        currentPartNumber = null;
        if (line[colIndex] !== ".") {
          const symbol = {
            value: line[colIndex],
            rowIndex,
            colIndex,
          };
          symbols = [...symbols, symbol];
        }
      }
    }
    console.log(line);
  });

  let symbolMatrix = Array(totalRows)
    .fill()
    .map(() => Array(totalColumns).fill(false));

  symbols.forEach((symbol) => {
    symbolMatrix[symbol.rowIndex][symbol.colIndex] = true;
  });

  let sum = 0;
  partNumbers.forEach(({ value, rowIndex, colIndex }) => {
    const valueLength = value.toString().length;
    let hasAdjecentSymbol = false;
    const startRowIndex = Math.max(0, rowIndex - 1);
    const startColIndex = Math.max(0, colIndex - 1);
    const endRowIndex = Math.min(rowIndex + 1, totalRows - 1);
    const endColIndex = Math.min(colIndex + valueLength, totalColumns);
    for (let i = startRowIndex; i <= endRowIndex && !hasAdjecentSymbol; i++) {
      for (let j = startColIndex; j <= endColIndex && !hasAdjecentSymbol; j++) {
        if (symbolMatrix[i][j]) {
          hasAdjecentSymbol = true;
        }
      }
    }

    if (hasAdjecentSymbol) {
      sum += value;
    }
    console.log(
      "partnumber",
      value,
      "hasAdjecentSymbol",
      hasAdjecentSymbol,
      "sum",
      sum
    );
  });
  console.log("sum", sum);
}

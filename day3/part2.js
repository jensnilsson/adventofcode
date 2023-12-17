const fs = require("fs");
fs.readFile("inputAlex.txt", "utf8", (err, data) => {
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
    console.log(line);
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
        if (line[colIndex] === "*") {
          const symbol = {
            value: line[colIndex],
            rowIndex,
            colIndex,
          };
          symbols = [...symbols, symbol];
        }
      }
    }
  });

  let partNumberMatrix = Array(totalRows)
    .fill()
    .map(() => Array(totalColumns).fill(null));

  partNumbers.forEach((partNumber) => {
    const partNumberLength = partNumber.value.toString().length;
    console.log(partNumberLength);
    for (let i = 0; i < partNumberLength; i++) {
      partNumberMatrix[partNumber.rowIndex][partNumber.colIndex + i] =
        partNumber;
    }
  });

  let sum = 0;
  symbols.forEach(({ value, rowIndex, colIndex }) => {
    const valueLength = 1;
    let adjacentNumbers = [];

    const startRowIndex = Math.max(0, rowIndex - 1);
    const endRowIndex = Math.min(rowIndex + 1, totalRows - 1);

    const startColIndex = Math.max(0, colIndex - 1);
    const endColIndex = Math.min(colIndex + valueLength, totalColumns);

    for (let i = startRowIndex; i <= endRowIndex; i++) {
      for (let j = startColIndex; j <= endColIndex; j++) {
        cell = partNumberMatrix[i][j];
        if (cell && !adjacentNumbers.includes(cell)) {
          adjacentNumbers = [...adjacentNumbers, cell];
        }
      }
    }
    let gearRatio = 0;
    if (adjacentNumbers.length === 2) {
      gearRatio = adjacentNumbers[0].value * adjacentNumbers[1].value;
      sum += gearRatio;
    }
    console.log(
      "symbol",
      value,
      rowIndex,
      colIndex,
      "gearRatio",
      gearRatio,
      "sum",
      sum
    );
  });
  console.log("sum", sum);
}

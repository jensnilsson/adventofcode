const fs = require("fs");
fs.readFile("inputJens.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let sum = 0;
  fileData.split(/\r?\n/).forEach((line, rowIndex) => {
    const cardId = parseInt(line.split(": ")[0].split(" ")[1]);
    const answers = line
      .split(": ")[1]
      .split(" | ")[0]
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => parseInt(el));

    const myNumbers = line
      .split(": ")[1]
      .split(" | ")[1]
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => parseInt(el));

    const myWinningNumbers = myNumbers.filter((value) =>
      answers.includes(value)
    );

    const score =
      myWinningNumbers.length > 0
        ? Math.pow(2, myWinningNumbers.length - 1)
        : 0;

    sum += score;

    console.log("score", score, "sum", sum);
  });
}

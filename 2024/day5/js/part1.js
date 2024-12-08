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

  const regex = /mul\(\d+,\d+\)/g;
  const matches = fileData.match(regex);

  matches.map((match) => {
    const values = match
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    answer += values[0] * values[1];
  });

  console.log("answer", answer);
}

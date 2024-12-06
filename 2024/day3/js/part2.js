const fs = require("fs");
fs.readFile("inputAlex.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let answer = 0;
  let reading = false;
  let newData = "";

  const parts = fileData.split(/(don't\(\)|do\(\))/g);

  parts.forEach((part) => {
    console.log("part:", part);
    if (part === "do()") {
      reading = !reading;

      if (reading) {
        newData += part;
      }
    }

    if (part === "don't()") {
      reading = false;
    }

    if (reading) {
      newData += part;
    }

    const regex = /mul\(\d+,\d+\)/g;
    const matches = newData.match(regex);
    console.log("matches:", matches);

    matches?.map((match) => {
      const values = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number);

      answer += values[0] * values[1];
    });
  });

  console.log("answer", answer);

  /*   const removeUncorruptedConditions = fileData.replaceAll(
    /don't\(\)(.*?)do\(\)/g,
    ""
  ); */

  //  /^don't\(\)(.*)do\(\)$/

  /*   const regex = /mul\(\d+,\d+\)/g;
  const matches = removeUncorruptedConditions.match(regex);
  console.log("matches:", matches[matches.length - 1]);

  matches.map((match) => {
    const values = match
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    answer += values[0] * values[1];
  });

  console.log("answer", answer); */
}

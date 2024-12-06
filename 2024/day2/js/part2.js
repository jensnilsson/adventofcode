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

  fileData.split(/\r?\n/).forEach((line) => {
    let values = line.split(" ").map(Number);

    let { safe, failedIndex } = isSafe(values);
    for (let i = failedIndex - 1; i < failedIndex + 2; i++) {
      if (!safe) {
        safe = isSafeAfterRemoval(values, i);
      }
    }

    answer += safe ? 1 : 0;
  });

  console.log("answer", answer);
}

function isSafe(values) {
  const isIncrease = isIncreasing(values[0], values[1]);

  for (let i = 0; i < values.length - 1; i++) {
    diff = isIncrease ? values[i + 1] - values[i] : values[i] - values[i + 1];
    if (diff < 1 || diff > 3) {
      return { safe: false, failedIndex: i };
    }
  }

  return { safe: true, failedIndex: -1 };
}

function isIncreasing(first, second) {
  return first < second;
}

function isSafeAfterRemoval(values, failedIndex) {
  const pruned = values.filter((value, index) => index !== failedIndex);
  return isSafe(pruned).safe;
}

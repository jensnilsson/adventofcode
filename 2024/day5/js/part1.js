const fs = require('fs');
fs.readFile('inputAlex.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  parseFile(data);
});

function parseFile(fileData) {
  let hasSeenEmptyLine = false;
  const ruleMap = {};
  let answer = 0;

  fileData.split(/\r?\n/).forEach((line) => {
    if (line === '') {
      hasSeenEmptyLine = true;
      return;
    }
    if (!hasSeenEmptyLine) {
      const rule = line.split('|');
      if (!ruleMap[rule[1]]) {
        ruleMap[rule[1]] = [rule[0]];
      } else {
        ruleMap[rule[1]].push(rule[0]);
      }
    }

    if (hasSeenEmptyLine) {
      let isValid = true;
      const updateList = line.split(',');
      updateList.forEach((entry, index) => {
        const remainingEntries = updateList.slice(index + 1);
        const valuesBefore = ruleMap[entry];

        const filteredArray = remainingEntries.filter((value) =>
          valuesBefore?.includes(value)
        );

        if (filteredArray.length > 0) {
          isValid = false;
          return;
        }
      });

      if (isValid) {
        const middleIndex = (updateList.length - 1) / 2;
        answer += parseInt(updateList[middleIndex]);
      }
    }
  });
  console.log(answer);
}

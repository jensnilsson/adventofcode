const { info } = require("console");
const fs = require("fs");
fs.readFile("inputJens.txt", "utf8", (err, data) => {
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
  let update_row = 0;

  fileData.split(/\r?\n/).forEach((line) => {
    if (line === "") {
      hasSeenEmptyLine = true;
      return;
    }
    if (!hasSeenEmptyLine) {
      const rule = line.split("|");
      if (!ruleMap[rule[1]]) {
        ruleMap[rule[1]] = [rule[0]];
      } else {
        ruleMap[rule[1]].push(rule[0]);
      }
    }

    if (hasSeenEmptyLine) {
      let isValid = true;
      const updateList = line.split(",");
      let new_update_list = [...updateList];
      update_row++;

      updateList.forEach((entry) => {
        const index = new_update_list.indexOf(entry);
        const remainingEntries = new_update_list.slice(index + 1);
        const valuesBefore = ruleMap[entry];

        const filteredArray = remainingEntries.filter((value) =>
          valuesBefore?.includes(value)
        );

        if (filteredArray.length > 0) {
          isValid = false;
          move_after_element = filteredArray[filteredArray.length - 1];
          move_after_index = new_update_list.indexOf(move_after_element);
          list_before = index > 0 ? new_update_list.slice(0, index) : [];
          list_to_move_earlier = new_update_list.slice(
            index + 1,
            move_after_index + 1
          );
          list_after_entry = new_update_list.slice(move_after_index + 1);

          new_update_list = [
            ...list_before,
            ...list_to_move_earlier,
            ...[entry],
            ...list_after_entry,
          ];
        }
      });

      if (!isValid) {
        const middleIndex = (new_update_list.length - 1) / 2;
        answer += parseInt(new_update_list[middleIndex]);
      }
    }
  });
  console.log(answer);
}

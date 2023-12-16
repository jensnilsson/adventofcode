
const list = ["1abc2",
"pqr3stu8vwx",
"a1b2c3d4e5f",
"treb7uchet"];

let sum = 0;

list.forEach(line => {
  let first_interger = null
  let last_interger = null
  for (const char of line) {
    isnum = typeof char === "number";
    if ( isnum ) {
      first_interger = first_interger ? first_interger : char
      last_interger = char
    }
  };
  console.log("first_interger ", first_interger);
  console.log("last_interger", last_interger)
  const value = first_interger + last_interger;
  sum += value;
});

console.log("Sum: ", sum);
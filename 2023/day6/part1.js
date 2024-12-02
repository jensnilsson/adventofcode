// Test
//const times = [7, 15, 30]; // p
//const distance = [9, 40, 200]; // q

// Alex
const times = [35, 69, 68, 87];
const distance = [213, 1168, 1086, 1248];

// Jens

let solutions = 1;
times.forEach((time, index) => {
  let minusResult = pqSolveMinus(time, distance[index]);
  let plusResult = pqSolvePlus(time, distance[index]);

  if (Number.isInteger(minusResult)) {
    minusResult += 1;
  }

  if (Number.isInteger(plusResult)) {
    plusResult -= 1;
  }

  plusResult = Math.floor(plusResult);
  minusResult = Math.ceil(minusResult);

  solutions = solutions * (plusResult - minusResult + 1);

  console.log('minusResult', minusResult);
  console.log('plusResult', plusResult);
});
console.log('solutions', solutions);

function pqSolvePlus(p, q) {
  return p / 2 + Math.sqrt(Math.pow(p / 2, 2) - q);
}

function pqSolveMinus(p, q) {
  return p / 2 - Math.sqrt(Math.pow(p / 2, 2) - q);
}

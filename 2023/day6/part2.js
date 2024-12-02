// Test
//const times = [71530]; // p
//const distance = [940200]; // q

// Alex
const times = [35696887];
const distance = [213116810861248];

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
});

console.log('solutions', solutions);

function pqSolvePlus(p, q) {
  return p / 2 + Math.sqrt(Math.pow(p / 2, 2) - q);
}

function pqSolveMinus(p, q) {
  return p / 2 - Math.sqrt(Math.pow(p / 2, 2) - q);
}

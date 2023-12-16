const fs = require('fs');
fs.readFile('inputAlex1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  parseFile(data);
});

// red, green, blue
const allowedCubes = { red: 12, green: 13, blue: 14 };

function parseFile(fileData) {
  sum = 0;
  fileData.split(/\r?\n/).forEach((line) => {
    const sets = line.split(':')[1].split(';');
    const gameId = parseInt(line.split(':')[0].split(' ')[1]);
    const game = sets.map((set) => {
      const cubes = { red: 0, green: 0, blue: 0 };
      set.split(',').forEach((cubeSet) => {
        const trimmedSet = cubeSet.trim();
        const splitSet = trimmedSet.split(' ');
        cubes[splitSet[1]] = parseInt(splitSet[0]);
      });
      return cubes;
    });

    let isValid = true;
    game.forEach((gameSet) => {
      if (!isValid) {
        return;
      }

      Object.keys(allowedCubes).forEach((color) => {
        if (!isValid) {
          return;
        }
        isValid = gameSet[color] < allowedCubes[color];
      });
    });

    if (isValid) {
      sum += gameId;
    }

    console.log('gameid: ', gameId, 'game: ', game, 'sum: ', sum);
  });
}

const fs = require('fs');
fs.readFile('inputJens.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  parseFile(data);
});

const allowedCubes = { red: 12, green: 13, blue: 14 };

function parseFile(fileData) {
  sum = 0;
  fileData.split(/\r?\n/).forEach((line) => {
    const sets = line.split(':')[1].split(';');
    const gameId = parseInt(line.split(':')[0].split(' ')[1]);
    const game = sets.map((setString) => {
      const gameSet = { red: 0, green: 0, blue: 0 };
      setString.split(',').forEach((colorString) => {
        const color = colorString.trim().split(' ');
        gameSet[color[1]] = parseInt(color[0]);
      });
      return gameSet;
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
        isValid = gameSet[color] <= allowedCubes[color];
      });
    });

    if (isValid) {
      sum += gameId;
    }

    console.log('gameid: ', gameId, 'game: ', game, 'sum: ', sum);
  });
}

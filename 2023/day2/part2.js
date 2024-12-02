const fs = require('fs');
fs.readFile('inputJens.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  parseFile(data);
});

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

    minSet = { green: 0, red: 0, blue: 0 };
    game.forEach((gameSet) => {
      Object.keys(minSet).forEach((color) => {
        minSet[color] = Math.max(minSet[color], gameSet[color]);
      });
    });

    power = minSet.green * minSet.blue * minSet.red;
    sum += power;
    
    console.log('gameid: ', gameId, ': ', game, 'minSet', minSet, 'power', power, 'sum: ', sum);
  });
}

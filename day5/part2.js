const { log } = require('console');
const fs = require('fs');
fs.readFile('inputAlex.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let seedRanges = fileData
    .split(/\r?\n/)[0]
    .split('seeds: ')[1]
    .trim()
    .split(' ')
    .map((seed) => parseInt(seed));

  let rangeStartSeed;

  let seeds = [];
  seedRanges.forEach((seed) => {
    if (!rangeStartSeed) {
      rangeStartSeed = seed;
    } else {
      const rangeLength = seed;
      for (
        let seed = rangeStartSeed;
        seed < rangeStartSeed + rangeLength;
        seed++
      ) {
        seeds.push(seed);
      }
      rangeStartSeed = undefined;
    }
  });

  let maps = [];
  let currentMap = null;
  fileData.split(/\r?\n/).forEach((line, rowIndex) => {
    if (!line) {
      if (currentMap) {
        maps = [...maps, currentMap];
      }
      currentMap = [];
    }

    if (/^\d/.test(line)) {
      const range = line.split(' ').map((value) => parseInt(value));
      currentMap = [...currentMap, range];
    }
  });
  if (currentMap) {
    maps = [...maps, currentMap];
  }
  let lowestValue = Infinity;
  seeds.forEach((seed) => {
    console.log('new seed', seed);
    maps.forEach((map, mapIndex) => {
      map.every((range) => {
        const rangeStart = range[1];
        const rangeEnd = range[1] + range[2] - 1;

        const diff = range[0] - range[1];
        if (seed >= rangeStart && seed <= rangeEnd) {
          seed += diff;
          console.log('->', seed, 'changed by map', mapIndex);
          return false;
        }
        return true;
      });
    });

    console.log('end', seed);
    lowestValue = Math.min(seed, lowestValue);
    console.log('lowest', lowestValue);
  });
}

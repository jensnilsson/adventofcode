const { log } = require("console");
const fs = require("fs");
fs.readFile("inputJens.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let seedList = fileData
    .split(/\r?\n/)[0]
    .split("seeds: ")[1]
    .trim()
    .split(" ")
    .map((seed) => parseInt(seed));

  let rangeStartSeed;

  let seedRanges = [];
  seedList.forEach((seed) => {
    if (!rangeStartSeed) {
      rangeStartSeed = seed;
    } else {
      const rangeLength = seed;
      seedRange = [rangeStartSeed, rangeLength];
      seedRanges = [...seedRanges, seedRange];
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
      const range = line.split(" ").map((value) => parseInt(value));
      currentMap = [...currentMap, range];
    }
  });
  if (currentMap) {
    maps = [...maps, currentMap];
  }
  let lowestValue = Infinity;

  seedRanges.forEach((seedRange) => {
    for (
      let index = seedRange[0];
      index < seedRange[0] + seedRange[1];
      index++
    ) {
      let seed = index;
      maps.forEach((map, mapIndex) => {
        map.every((range) => {
          const rangeStart = range[1];
          const rangeEnd = range[1] + range[2] - 1;

          const diff = range[0] - range[1];
          if (seed >= rangeStart && seed <= rangeEnd) {
            seed += diff;
            return false;
          }
          return true;
        });
      });
      lowestValue = Math.min(seed, lowestValue);
    }
    console.log("lowest", lowestValue);
  });
}

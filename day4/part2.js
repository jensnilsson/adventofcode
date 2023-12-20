const fs = require('fs');
fs.readFile('inputJens.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseFile(data);
});

function parseFile(fileData) {
  let scoreCards = [];
  fileData.split(/\r?\n/).forEach((line, rowIndex) => {
    const cardId = parseInt(line.substring(4));
    const answers = line
      .split(': ')[1]
      .split(' | ')[0]
      .split(' ')
      .filter((el) => el !== '')
      .map((el) => parseInt(el));

    const myNumbers = line
      .split(': ')[1]
      .split(' | ')[1]
      .split(' ')
      .filter((el) => el !== '')
      .map((el) => parseInt(el));

    const myWinningNumbers = myNumbers.filter((value) =>
      answers.includes(value)
    );

    scoreCards = [
      ...scoreCards,
      { id: cardId, count: 1, matchingNumbers: myWinningNumbers.length },
    ];
  });

  scoreCards.forEach((card, index) => {
    for (let i = 1; i <= card.matchingNumbers; i++) {
      scoreCards[index + i].count += card.count;
    }
  });

  const sum = scoreCards.reduce((acc, card) => {
    return acc + card.count;
  }, 0);

  console.log('sum', sum);
}

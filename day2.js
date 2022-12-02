function reparsePlays(play) {
  switch (play) {
    case 'X':
      return 'A';
    case 'Y':
      return 'B';
    case 'Z':
      return 'C';
  }
}

function decidePlay(match) {

  //Still not using typescript on a day full of enums lol
  const rpsToNum = {
    A: 0,
    B: 1,
    C: 2
  }
  const rpsMatrix = [
    //T M  R  P  S
    /*R*/ [1, 2, 0],
    /*P*/ [0, 1, 2],
    /*S*/ [2, 0, 1]
  ]
  const winLoseDraw = {
    Z: 2,
    X: 0,
    Y: 1
  }
  const play = rpsMatrix[rpsToNum[match.them]].indexOf(winLoseDraw[match.me]);
  return Object.keys(rpsToNum).find((k) => rpsToNum[k] === play)
}

function playAndScore(match) {
  const rpsScore = {
    A: 1,
    B: 2,
    C: 3
  }

  let score = 0;

  //SHAPE
  score += rpsScore[match.me];
  //OUTCOME
  if ((match.me == 'A' && match.them == 'C') ||
    (match.me == 'B' && match.them == 'A') ||
    (match.me == 'C' && match.them == 'B')) {
    score += 6;
  } else if (match.me == match.them) {
    score += 3;
  }

  return score;
}

function parseDumpToModel(dump, mut = false) {
  let overall = 0;
  const splitter = dump.split('\n');
  const strats = splitter.map((v) => {
    return {
      them: mut ? reparsePlays(v.slice(0, 1)) : v.slice(0, 1),
      me: v.slice(-1)
    }
  });
  return strats;
}

function calculate(data) {
  const stratList = parseDumpToModel(data);
  const playList = stratList.map((v) => {
    return {
      me: decidePlay(v),
      them: v.them
    }
  });
  let totalScore = 0;
  playList.map(v => totalScore += playAndScore(v))
  return totalScore;
}

console.log(calculate(dat));

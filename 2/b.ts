const PLAY_NAMES = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
} as const;

const PLAYS = {
  [PLAY_NAMES.rock]: {
    name: PLAY_NAMES.rock,
    beats: PLAY_NAMES.scissors,
    points: 1,
    symbol: 'A',
  },
  [PLAY_NAMES.paper]: {
    name: PLAY_NAMES.paper,
    beats: PLAY_NAMES.rock,
    points: 2,
    symbol: 'B',
  },
  [PLAY_NAMES.scissors]: {
    name: PLAY_NAMES.scissors,
    beats: PLAY_NAMES.paper,
    points: 3,
    symbol: 'C',
  },
} as const;

const MATCH_RESULT_NAMES = {
  win: 'win',
  draw: 'draw',
  loss: 'loss',
} as const;

const MATCH_RESULTS = {
  [MATCH_RESULT_NAMES.win]: {
    name: MATCH_RESULT_NAMES.win,
    points: 6,
    symbol: 'Z',
  },
  [MATCH_RESULT_NAMES.draw]: {
    name: MATCH_RESULT_NAMES.draw,
    points: 3,
    symbol: 'Y',
  },
  [MATCH_RESULT_NAMES.loss]: {
    name: MATCH_RESULT_NAMES.loss,
    points: 0,
    symbol: 'X',
  },
} as const;

type ObjectValues<T> = T[keyof T];

type PlaySymbol = ObjectValues<typeof PLAYS>['symbol'];
type MatchResultSymbol = ObjectValues<typeof MATCH_RESULTS>['symbol'];

type MatchStrategy = [
  opponentsPlaySymbol: PlaySymbol,
  matchResultSymbol: MatchResultSymbol
];

function getPlay(symbol: PlaySymbol) {
  for (const currentPlay of Object.values(PLAYS)) {
    if (currentPlay.symbol === symbol) {
      return currentPlay;
    }
  }

  throw new Error('Invalid symbol');
}

function getMatchResult(symbol: MatchResultSymbol) {
  for (const currentMatchResult of Object.values(MATCH_RESULTS)) {
    if (currentMatchResult.symbol === symbol) {
      return currentMatchResult;
    }
  }

  throw new Error('Invalid symbol');
}

function getMyMatchPoints(
  opponentsPlaySymbol: PlaySymbol,
  matchResultSymbol: MatchResultSymbol
) {
  const opponentsPlay = getPlay(opponentsPlaySymbol);
  const matchResult = getMatchResult(matchResultSymbol);

  let myPoints = 0;

  if (matchResult.name === MATCH_RESULT_NAMES.win) {
    // Win
    const winningPlay = Object.values(PLAYS).find(
      (currentPlay) => currentPlay.beats === opponentsPlay.name
    ) as ObjectValues<typeof PLAYS>;

    myPoints += winningPlay.points;
  } else if (matchResult.name === MATCH_RESULT_NAMES.loss) {
    // Loss
    const losingPlay = PLAYS[opponentsPlay.beats];

    myPoints += losingPlay.points;
  } else {
    // Draw
    const drawPlay = opponentsPlay;

    myPoints += drawPlay.points;
  }

  myPoints += matchResult.points;

  return myPoints;
}

const input = await Deno.readTextFile('./input.txt');

const matches = input.split('\n');

let myTotalPoints = 0;

for (const match of matches) {
  const [opponentsPlaySymbol, matchResultSymbol] = match.split(
    ' '
  ) as MatchStrategy;

  const myMatchPoints = getMyMatchPoints(
    opponentsPlaySymbol,
    matchResultSymbol
  );
  myTotalPoints += myMatchPoints;
}

console.log(myTotalPoints);

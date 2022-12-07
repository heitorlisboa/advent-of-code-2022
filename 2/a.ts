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
    symbols: ['A', 'X'],
  },
  [PLAY_NAMES.paper]: {
    name: PLAY_NAMES.paper,
    beats: PLAY_NAMES.rock,
    points: 2,
    symbols: ['B', 'Y'],
  },
  [PLAY_NAMES.scissors]: {
    name: PLAY_NAMES.scissors,
    beats: PLAY_NAMES.paper,
    points: 3,
    symbols: ['C', 'Z'],
  },
} as const;

const MATCH_RESULT_POINTS = {
  win: 6,
  draw: 3,
  loss: 0,
} as const;

type ObjectValues<T> = T[keyof T];

type MyPlaySymbol = ObjectValues<typeof PLAYS>['symbols'][1];
type OpponentsPlaySymbol = ObjectValues<typeof PLAYS>['symbols'][0];

type MatchPlays = [
  opponentsPlaySymbol: OpponentsPlaySymbol,
  myPlaySymbol: MyPlaySymbol
];

function getPlay(symbol: MyPlaySymbol | OpponentsPlaySymbol) {
  for (const currentPlay of Object.values(PLAYS)) {
    if ((currentPlay.symbols as unknown as string[]).includes(symbol)) {
      return currentPlay;
    }
  }

  throw new Error('Invalid symbol');
}

function getMyMatchPoints(
  myPlaySymbol: MyPlaySymbol,
  opponentsPlaySymbol: OpponentsPlaySymbol
) {
  const myPlay = getPlay(myPlaySymbol);
  const opponentsPlay = getPlay(opponentsPlaySymbol);

  let myPoints = myPlay.points;
  if (myPlay.beats === opponentsPlay.name) {
    // Win
    myPoints += MATCH_RESULT_POINTS.win;
  } else if (opponentsPlay.beats === myPlay.name) {
    // Loss
    myPoints += MATCH_RESULT_POINTS.loss;
  } else {
    // Draw
    myPoints += MATCH_RESULT_POINTS.draw;
  }

  return myPoints;
}

const input = await Deno.readTextFile('./input.txt');

const matches = input.split('\n');

let myTotalPoints = 0;

for (const match of matches) {
  const [opponentsPlaySymbol, myPlaySymbol] = match.split(' ') as MatchPlays;

  const myMatchPoints = getMyMatchPoints(myPlaySymbol, opponentsPlaySymbol);
  myTotalPoints += myMatchPoints;
}

console.log(myTotalPoints);

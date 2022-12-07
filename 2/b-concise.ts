const PLAY_SYMBOLS = ['A', 'B', 'C'] as const;

type PlaySymbol = typeof PLAY_SYMBOLS[number];
type MatchResultSymbol = 'X' | 'Y' | 'Z';

type MatchStrategy = [
  opponentsPlaySymbol: PlaySymbol,
  matchResultSymbol: MatchResultSymbol
];

function getMyMatchPoints(
  opponentsPlaySymbol: PlaySymbol,
  matchResultSymbol: MatchResultSymbol
) {
  let myPoints = 0;

  if (matchResultSymbol === 'Z') {
    // Win
    const opponentsPlaySymbolIndex = PLAY_SYMBOLS.indexOf(opponentsPlaySymbol);
    const winningPlaySymbol =
      opponentsPlaySymbolIndex === PLAY_SYMBOLS.length - 1
        ? PLAY_SYMBOLS[0]
        : PLAY_SYMBOLS[opponentsPlaySymbolIndex + 1];

    const playPoints = PLAY_SYMBOLS.indexOf(winningPlaySymbol) + 1;

    myPoints += playPoints + 6;
  } else if (matchResultSymbol === 'Y') {
    // Draw
    const drawPlaySymbol = opponentsPlaySymbol;

    const playPoints = PLAY_SYMBOLS.indexOf(drawPlaySymbol) + 1;

    myPoints += playPoints + 3;
  } else if (matchResultSymbol === 'X') {
    // Loss
    const opponentsPlaySymbolIndex = PLAY_SYMBOLS.indexOf(opponentsPlaySymbol);
    const losingPlaySymbol = PLAY_SYMBOLS.at(
      opponentsPlaySymbolIndex - 1
    ) as PlaySymbol;

    const playPoints = PLAY_SYMBOLS.indexOf(losingPlaySymbol) + 1;

    myPoints += playPoints;
  }

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

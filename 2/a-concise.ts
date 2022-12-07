const DEFAULT_PLAY_SYMBOLS = ['A', 'B', 'C'] as const;

const SYMBOL_EQUIVALENTS = {
  X: 'A',
  Y: 'B',
  Z: 'C',
} as const;

type MyPlaySymbol = 'X' | 'Y' | 'Z';
type OpponentsPlaySymbol = typeof DEFAULT_PLAY_SYMBOLS[number];

type MatchPlays = [
  opponentsPlaySymbol: OpponentsPlaySymbol,
  myPlaySymbol: MyPlaySymbol
];

function getMyMatchPoints(
  myPlaySymbol: MyPlaySymbol,
  opponentsPlaySymbol: OpponentsPlaySymbol
) {
  const myPlaySymbolEquivalent = SYMBOL_EQUIVALENTS[myPlaySymbol];

  const playPoints = DEFAULT_PLAY_SYMBOLS.indexOf(myPlaySymbolEquivalent) + 1;
  let myPoints = playPoints;

  const opponentsPlaySymbolIndex =
    DEFAULT_PLAY_SYMBOLS.indexOf(opponentsPlaySymbol);
  const winningPlaySymbol =
    opponentsPlaySymbolIndex === DEFAULT_PLAY_SYMBOLS.length - 1
      ? DEFAULT_PLAY_SYMBOLS[0]
      : DEFAULT_PLAY_SYMBOLS[opponentsPlaySymbolIndex + 1];

  // Win
  if (myPlaySymbolEquivalent === winningPlaySymbol) myPoints += 6;
  // Draw
  else if (myPlaySymbolEquivalent === opponentsPlaySymbol) myPoints += 3;

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

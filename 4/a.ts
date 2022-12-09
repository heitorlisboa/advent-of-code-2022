const input = await Deno.readTextFile('./input.txt');

const pairs = input.split('\n');

let pairsWhichOneRangeFullyContainsTheOther = 0;

for (const pair of pairs) {
  const [firstElfRangeOfSections, secondElfRangeOfSections] = pair.split(',');
  const [firstElfRangeStart, firstElfRangeEnd] = firstElfRangeOfSections
    .split('-')
    .map((string) => parseInt(string));
  const [secondElfRangeStart, secondElfRangeEnd] = secondElfRangeOfSections
    .split('-')
    .map((string) => parseInt(string));

  const secondElfRangeContainsFirstElfRange =
    firstElfRangeStart >= secondElfRangeStart &&
    firstElfRangeEnd <= secondElfRangeEnd;
  const firstElfRangeContainsSecondElfRange =
    secondElfRangeStart >= firstElfRangeStart &&
    secondElfRangeEnd <= firstElfRangeEnd;

  if (
    secondElfRangeContainsFirstElfRange ||
    firstElfRangeContainsSecondElfRange
  ) {
    pairsWhichOneRangeFullyContainsTheOther++;
  }
}

console.log(pairsWhichOneRangeFullyContainsTheOther);

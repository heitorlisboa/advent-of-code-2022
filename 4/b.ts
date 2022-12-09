const input = await Deno.readTextFile('./input.txt');

const pairs = input.split('\n');

let pairsWithOverlappingSections = 0;

for (const pair of pairs) {
  const [firstElfRangeOfSections, secondElfRangeOfSections] = pair.split(',');
  const [firstElfRangeStart, firstElfRangeEnd] = firstElfRangeOfSections
    .split('-')
    .map((string) => parseInt(string));
  const [secondElfRangeStart, secondElfRangeEnd] = secondElfRangeOfSections
    .split('-')
    .map((string) => parseInt(string));

  const rangesAreOverlapping =
    firstElfRangeStart <= secondElfRangeEnd &&
    secondElfRangeStart <= firstElfRangeEnd;

  if (rangesAreOverlapping) pairsWithOverlappingSections++;
}

console.log(pairsWithOverlappingSections);

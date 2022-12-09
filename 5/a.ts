const input = await Deno.readTextFile('./input.txt');

const [startingStacks, procedureSteps] = input.split('\n\n');

function parseStacks(stacks: string) {
  const stackRows = stacks.split('\n').slice(0, -1).reverse();
  // Size of the bottom row of stacks
  const numberOfStacks = stackRows[0].length + 1 / 4;
  const parsedStacks: string[][] = [];

  for (let currentStack = 0; currentStack < numberOfStacks; currentStack++) {
    const crateLetterIndex = currentStack * 4 + 1;
    parsedStacks.push(
      stackRows
        // Iterating over the rows getting all the crates of the current stack
        .map((stackRow) => stackRow[crateLetterIndex])
        // Removing the empty strings
        .filter((crate) => crate !== ' ')
    );
  }

  return parsedStacks;
}

function rearrangeStacks(stacks: string[][]) {
  const stacksCopy = stacks.map((stack) => [...stack]);

  for (const procedureStep of procedureSteps.split('\n')) {
    const [numberOfCratesToMove, fromStack, toStack] = procedureStep
      .match(/move (\d+) from (\d) to (\d)/)!
      // Removing the match string
      .slice(1)
      .map((string) => parseInt(string));

    for (
      let cratesLeftToMove = numberOfCratesToMove;
      cratesLeftToMove > 0;
      cratesLeftToMove--
    ) {
      const removedCrate = stacksCopy[fromStack - 1].pop()!;
      stacksCopy[toStack - 1].push(removedCrate);
    }
  }

  return stacksCopy;
}

const parsedStacks = parseStacks(startingStacks);
const stacksAfterRearrangement = rearrangeStacks(parsedStacks);

const cratesOnTop = stacksAfterRearrangement
  .map((stack) => stack.at(-1)!)
  .join('');

console.log(cratesOnTop);

const input = await Deno.readTextFile('./input.txt');

type Position = {
  column: number;
  row: number;
};

function getIfKnotsTouch(positionA: Position, positionB: Position): boolean {
  const knotsAreNotTouching =
    Math.abs(positionA.column - positionB.column) > 1 ||
    Math.abs(positionA.row - positionB.row) > 1;

  return !knotsAreNotTouching;
}

function getNextTailPosition(
  nextHeadPosition: Position,
  tailPosition: Position
): Position {
  const willKnotsTouch = getIfKnotsTouch(nextHeadPosition, tailPosition);
  if (willKnotsTouch) return tailPosition;

  const nextTailPosition: Position = { ...tailPosition };

  const headIsUp = nextHeadPosition.row < tailPosition.row;
  const headIsDown = nextHeadPosition.row > tailPosition.row;
  const headIsLeft = nextHeadPosition.column < tailPosition.column;
  const headIsRight = nextHeadPosition.column > tailPosition.column;

  if (headIsUp) nextTailPosition.row--;
  if (headIsDown) nextTailPosition.row++;
  if (headIsLeft) nextTailPosition.column--;
  if (headIsRight) nextTailPosition.column++;

  return nextTailPosition;
}

const commands = input.split('\n');
const currentHeadPosition: Position = { column: 0, row: 0 };
let currentTailPosition: Position = { column: 0, row: 0 };
const positionsTailVisited = new Set<string>();

for (const command of commands) {
  const [direction, stepsAsString] = command.split(' ');
  const steps = parseInt(stepsAsString);
  const moveFunctions = {
    U: () => currentHeadPosition.row--,
    D: () => currentHeadPosition.row++,
    L: () => currentHeadPosition.column--,
    R: () => currentHeadPosition.column++,
  };
  const correspondingMoveFunction =
    moveFunctions[direction as keyof typeof moveFunctions];
  for (let stepsLeft = steps; stepsLeft > 0; stepsLeft--) {
    correspondingMoveFunction();
    currentTailPosition = getNextTailPosition(
      currentHeadPosition,
      currentTailPosition
    );

    positionsTailVisited.add(
      `${currentTailPosition.column},${currentTailPosition.row}`
    );
  }
}

console.log(positionsTailVisited.size);

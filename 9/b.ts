const input = await Deno.readTextFile('./input.txt');

type Position = {
  column: number;
  row: number;
};

function getIfKnotsTouch(positionA: Position, positionB: Position): boolean {
  const columnsDistance = Math.abs(positionA.column - positionB.column);
  const rowsDistance = Math.abs(positionA.row - positionB.row);
  const knotsAreNotTouching = columnsDistance > 1 || rowsDistance > 1;

  return !knotsAreNotTouching;
}

function getNextKnotPosition(
  /** Position of previous knot after moving */
  previousKnot: Position,
  /** Position of current knot before moving */
  currentKnot: Position
): Position {
  const willKnotsTouch = getIfKnotsTouch(previousKnot, currentKnot);
  if (willKnotsTouch) return currentKnot;

  const nextPosition: Position = { ...currentKnot };

  const previousIsUp = previousKnot.row < currentKnot.row;
  const previousIsDown = previousKnot.row > currentKnot.row;
  const previousIsLeft = previousKnot.column < currentKnot.column;
  const previousIsRight = previousKnot.column > currentKnot.column;

  if (previousIsUp) nextPosition.row--;
  if (previousIsDown) nextPosition.row++;
  if (previousIsLeft) nextPosition.column--;
  if (previousIsRight) nextPosition.column++;

  return nextPosition;
}

const commands = input.split('\n');
const ropeKnotPositions: Position[] = [
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
  { column: 0, row: 0 },
];
const positionsTailVisited = new Set<string>();

for (const command of commands) {
  const [direction, stepsAsString] = command.split(' ');
  const steps = parseInt(stepsAsString);
  const headPosition = ropeKnotPositions[0];
  const moveFunctions = {
    U: () => headPosition.row--,
    D: () => headPosition.row++,
    L: () => headPosition.column--,
    R: () => headPosition.column++,
  };
  const correspondingMoveFunction =
    moveFunctions[direction as keyof typeof moveFunctions];
  for (let stepsLeft = steps; stepsLeft > 0; stepsLeft--) {
    // Moving the head knot
    correspondingMoveFunction();

    // Moving each other knot
    for (let ropeKnot = 1; ropeKnot <= 9; ropeKnot++) {
      ropeKnotPositions[ropeKnot] = getNextKnotPosition(
        ropeKnotPositions[ropeKnot - 1],
        ropeKnotPositions[ropeKnot]
      );
    }

    const tailPosition = ropeKnotPositions[9];
    positionsTailVisited.add(`${tailPosition.column},${tailPosition.row}`);
  }
}

console.log(positionsTailVisited.size);

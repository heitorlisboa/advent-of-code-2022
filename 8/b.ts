const input = await Deno.readTextFile('./input.txt');

const treeGrid = input
  .split('\n')
  .map((row) => row.split('').map((treeHeight) => parseInt(treeHeight)));

const numberOfRows = treeGrid.length;
const numberOfColumns = treeGrid[0].length;

function getTreeScenicScore(treeColumn: number, treeRow: number) {
  const treeHeight = treeGrid[treeRow][treeColumn];

  let treesVisibleOnTopSide = 0;
  for (let rowIndex = treeRow - 1; rowIndex >= 0; rowIndex--) {
    treesVisibleOnTopSide++;
    const topTreeHeight = treeGrid[rowIndex][treeColumn];
    if (topTreeHeight >= treeHeight) break;
  }

  let treesVisibleOnBottomSide = 0;
  for (let rowIndex = treeRow + 1; rowIndex < numberOfRows; rowIndex++) {
    treesVisibleOnBottomSide++;
    const bottomTreeHeight = treeGrid[rowIndex][treeColumn];
    if (bottomTreeHeight >= treeHeight) break;
  }

  let treesVisibleOnLeftSide = 0;
  for (let columnIndex = treeColumn - 1; columnIndex >= 0; columnIndex--) {
    treesVisibleOnLeftSide++;
    const leftTreeHeight = treeGrid[treeRow][columnIndex];
    if (leftTreeHeight >= treeHeight) break;
  }

  let treesVisibleOnRightSide = 0;
  for (
    let columnIndex = treeColumn + 1;
    columnIndex < numberOfColumns;
    columnIndex++
  ) {
    treesVisibleOnRightSide++;
    const rightTreeHeight = treeGrid[treeRow][columnIndex];
    if (rightTreeHeight >= treeHeight) break;
  }

  const scenicScore =
    treesVisibleOnTopSide *
    treesVisibleOnBottomSide *
    treesVisibleOnLeftSide *
    treesVisibleOnRightSide;

  return scenicScore;
}

let highestScenicScore = 0;

for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    const treeScenicScore = getTreeScenicScore(columnIndex, rowIndex);
    if (treeScenicScore > highestScenicScore)
      highestScenicScore = treeScenicScore;
  }
}

console.log(highestScenicScore);

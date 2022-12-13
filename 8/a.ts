const input = await Deno.readTextFile('./input.txt');

const treeGrid = input
  .split('\n')
  .map((row) => row.split('').map((treeHeight) => parseInt(treeHeight)));

const numberOfRows = treeGrid.length;
const numberOfColumns = treeGrid[0].length;

function getTreeVisibility(treeColumn: number, treeRow: number) {
  const treeHeight = treeGrid[treeRow][treeColumn];

  let topSideIsVisible = true;
  for (let rowIndex = 0; rowIndex < treeRow; rowIndex++) {
    const topTreeHeight = treeGrid[rowIndex][treeColumn];
    if (topTreeHeight >= treeHeight) {
      topSideIsVisible = false;
      break;
    }
  }
  if (topSideIsVisible) return true;

  let bottomSideIsVisible = true;
  for (let rowIndex = treeRow + 1; rowIndex < numberOfRows; rowIndex++) {
    const bottomTreeHeight = treeGrid[rowIndex][treeColumn];
    if (bottomTreeHeight >= treeHeight) {
      bottomSideIsVisible = false;
      break;
    }
  }
  if (bottomSideIsVisible) return true;

  let leftSideIsVisible = true;
  for (let columnIndex = 0; columnIndex < treeColumn; columnIndex++) {
    const leftTreeHeight = treeGrid[treeRow][columnIndex];
    if (leftTreeHeight >= treeHeight) {
      leftSideIsVisible = false;
      break;
    }
  }
  if (leftSideIsVisible) return true;

  let rightSideIsVisible = true;
  for (
    let columnIndex = treeColumn + 1;
    columnIndex < numberOfColumns;
    columnIndex++
  ) {
    const rightTreeHeight = treeGrid[treeRow][columnIndex];
    if (rightTreeHeight >= treeHeight) {
      rightSideIsVisible = false;
      break;
    }
  }
  if (rightSideIsVisible) return true;

  return false;
}

let numberOfVisibleTrees = 0;

for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    const isTreeVisible = getTreeVisibility(columnIndex, rowIndex);
    if (isTreeVisible) numberOfVisibleTrees++;
  }
}

console.log(numberOfVisibleTrees);

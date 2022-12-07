const input = await Deno.readTextFile('./input.txt');

const groupsOfCaloriesAsStrings = input.split('\n\n');

const totalCaloriesPerElf = groupsOfCaloriesAsStrings.map((group) => {
  const groupOfCaloriesAsNumbers = group
    .split('\n')
    .map((caloriesString) => parseInt(caloriesString));

  const sumOfCalories = groupOfCaloriesAsNumbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  return sumOfCalories;
});

const topThreeMostCalories = [...totalCaloriesPerElf]
  .sort((a, b) => b - a)
  .slice(-3);
const sumOfTopThree = topThreeMostCalories.reduce(
  (previousValue, currentValue) => previousValue + currentValue
);

console.log(sumOfTopThree);

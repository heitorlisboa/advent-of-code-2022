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

const mostCalories = Math.max(...totalCaloriesPerElf);

console.log(mostCalories);

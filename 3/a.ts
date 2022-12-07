const LOWERCASE_AND_UPPERCASE_ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getRepeatedItemType(
  firstCompartment: string,
  secondCompartment: string
) {
  for (const itemType of firstCompartment) {
    if (secondCompartment.includes(itemType)) {
      return itemType;
    }
  }

  throw new Error('Invalid input');
}

const input = await Deno.readTextFile('./input.txt');

const rucksacks = input.split('\n');

let itemPrioritySum = 0;

for (const rucksack of rucksacks) {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2);
  const secondCompartment = rucksack.slice(rucksack.length / 2);

  const repeatedItemType = getRepeatedItemType(
    firstCompartment,
    secondCompartment
  );

  const itemTypePriority =
    LOWERCASE_AND_UPPERCASE_ALPHABET.indexOf(repeatedItemType) + 1;
  itemPrioritySum += itemTypePriority;
}

console.log(itemPrioritySum);

const LOWERCASE_AND_UPPERCASE_ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getGroupBadgeItem(group: [string, string, string]) {
  const [elf1Rucksack, elf2Rucksack, elf3Rucksack] = group;
  for (const itemType of elf1Rucksack) {
    if (elf2Rucksack.includes(itemType) && elf3Rucksack.includes(itemType)) {
      return itemType;
    }
  }

  throw new Error('Invalid input');
}

const input = await Deno.readTextFile('./input.txt');

const rucksacks = input.split('\n');

let groupBadgePrioritySum = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const groupBadgeItem = getGroupBadgeItem([
    rucksacks[i],
    rucksacks[i + 1],
    rucksacks[i + 2],
  ]);

  const itemTypePriority =
    LOWERCASE_AND_UPPERCASE_ALPHABET.indexOf(groupBadgeItem) + 1;
  groupBadgePrioritySum += itemTypePriority;
}

console.log(groupBadgePrioritySum);

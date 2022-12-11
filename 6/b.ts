const input = await Deno.readTextFile('./input.txt');

let charactersProcessed = 0;
const lastFourCharacters: string[] = [];

for (const character of input) {
  lastFourCharacters.push(character);
  charactersProcessed++;

  if (lastFourCharacters.length < 14) continue;

  if (lastFourCharacters.length === 15) lastFourCharacters.shift();

  const uniqueCharacters = new Set(lastFourCharacters);
  const lastFourCharactersAreDifferent =
    uniqueCharacters.size === lastFourCharacters.length;

  if (lastFourCharactersAreDifferent) break;
}

console.log(charactersProcessed);

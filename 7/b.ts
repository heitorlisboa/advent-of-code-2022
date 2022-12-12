const input = await Deno.readTextFile('./input.txt');

const lines = input.split('\n');

type Directory = {
  directSize: number;
  subdirectories: { [name: string]: Directory };
  parentDirectory?: Directory;
};

const rootDirectory: Directory = { directSize: 0, subdirectories: {} };
let currentDirectory = rootDirectory;

function handleCommand(command: string) {
  const isChangeDirectoryCommand = command.startsWith('$ cd');
  if (isChangeDirectoryCommand) {
    const changeDirectoryArgument = command.replace('$ cd ', '');

    // Moving to the root
    if (changeDirectoryArgument === '/') currentDirectory = rootDirectory;
    // Moving back one level
    else if (changeDirectoryArgument === '..')
      currentDirectory = currentDirectory.parentDirectory!;
    // Moving to the given directory
    else {
      if (
        currentDirectory.subdirectories[changeDirectoryArgument] === undefined
      ) {
        currentDirectory.subdirectories[changeDirectoryArgument] = {
          directSize: 0,
          subdirectories: {},
          parentDirectory: currentDirectory,
        };
      }

      currentDirectory =
        currentDirectory.subdirectories[changeDirectoryArgument];
    }
  }
}

for (const line of lines) {
  const isCommand = line.startsWith('$');
  if (isCommand) {
    handleCommand(line);
    continue;
  }

  const isFile = !line.startsWith('dir');
  if (isFile) {
    const fileSize = parseInt(line.match(/^\d+/)![0]);
    currentDirectory.directSize += fileSize;
  }
}

const directorySizes: number[] = [];

function computeDirectorySizes(directory: Directory) {
  let directorySize = directory.directSize;

  const hasSubdirectories = Object.keys(directory.subdirectories).length > 0;
  if (hasSubdirectories) {
    for (const subdirectory of Object.values(directory.subdirectories)) {
      directorySize += computeDirectorySizes(subdirectory);
    }
  }

  directorySizes.push(directorySize);

  return directorySize;
}

const totalSpace = 70_000_000;
const spaceNeeded = 30_000_000;
const usedSpace = computeDirectorySizes(rootDirectory);
const unusedSpace = totalSpace - usedSpace;
const spaceToFreeUp = spaceNeeded - unusedSpace;

const smallestDirectoryThatCanFreeEnoughSpace = Math.min(
  ...directorySizes.filter((directorySize) => directorySize >= spaceToFreeUp)
);

console.log(smallestDirectoryThatCanFreeEnoughSpace);

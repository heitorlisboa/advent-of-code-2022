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

/* Sum of the total sizes of all directories with a total size of at most
100,000 */
let sumOfDirectorySizes = 0;

function computeDirectorySizes(directory: Directory) {
  let directorySize = directory.directSize;

  const hasSubdirectories = Object.keys(directory.subdirectories).length > 0;
  if (hasSubdirectories) {
    for (const subdirectory of Object.values(directory.subdirectories)) {
      directorySize += computeDirectorySizes(subdirectory);
    }
  }

  if (directorySize <= 100_000) sumOfDirectorySizes += directorySize;

  return directorySize;
}

computeDirectorySizes(rootDirectory);

console.log(sumOfDirectorySizes);

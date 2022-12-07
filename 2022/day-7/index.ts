import { getInput } from '../../utils/index.js';
import { find } from 'lodash-es'

enum COMMANDS {
  CD = 'cd',
  LS = 'ls',
}

enum TypeEnum {
  FILE,
  FOLDER,
}

type Node = {
  id: number,
  name: string,
  parentId: number,
  size?: number,
  type: TypeEnum,
}

// some stuff to make it more readable
const DIR = 'dir';
const DIR_ROOT = '/';
const DIR_UP = '..';
const PROMPT = '$';
const ROOT_FOLDER_ID = 1;

const MAX_FOLDER_SIZE = 100000;
const REQUIRED_DISK_SPACE = 30000000;
const TOTAL_DISK_SPACE = 70000000;

const getFilesystem = (input: string[]): Node[] => {
  let currentNodeId = 1;
  const fs: Node[] = [{ id: currentNodeId++, name: DIR_ROOT, parentId: null, type: TypeEnum.FOLDER }];
  let currentDir = fs[0];
  input.forEach(line => {
    const cmd = line.split(' ');
    switch (cmd[0]) {
      // listing a directory, adding it to the tree
      case DIR:
        fs.push({ id: currentNodeId++, name: cmd[1], parentId: currentDir.id, type: TypeEnum.FOLDER });
        break;
      // launching a command
      case PROMPT:
        // we don't care about ls
        if (cmd[1] === COMMANDS.LS) return;
        // changing directory
        if (cmd[1] === COMMANDS.CD) {
          if (cmd[2] === DIR_ROOT) {
            currentDir = fs[0];
          } else if (cmd[2] === DIR_UP) {
            currentDir = (currentDir.name === DIR_ROOT) ? fs[0] : find(fs, { id: currentDir.parentId });
          } else {
            // a new directory
            currentDir = find(fs, { parentId: currentDir.id, name: cmd[2] })
          }
        }
        break;
      // listing a file
      default:
        fs.push({ id: currentNodeId++, name: cmd[1], parentId: currentDir.id, type: TypeEnum.FILE, size: parseInt(cmd[0]) });
        break;
    }
  });
  return fs;
}

const getFolderSize = (fs: Node[], nodeId: number): number =>
  fs.filter((node) => node.parentId === nodeId)
    .reduce((a, b) => a + (b.type === TypeEnum.FILE ? b.size : getFolderSize(fs, b.id)), 0);

// crunching input
const input: string[] = getInput(2022, 7).split('\n');
const fs = getFilesystem(input);
const folderSizes = fs
  .filter((node) => node.type === TypeEnum.FOLDER)
  .map((node) => getFolderSize(fs, node.id));

export const firstPart = (): number =>
  // return the sum of folder sizes that are less than MAX_FOLDER_SIZE
  folderSizes.filter((size) => size <= MAX_FOLDER_SIZE).reduce((a, b) => a + b, 0);

export const secondPart = (): number => {
  const requiredSpaceNeeded = REQUIRED_DISK_SPACE - (TOTAL_DISK_SPACE - getFolderSize(fs, ROOT_FOLDER_ID));
  // getting the first folder with space used >= space required
  return folderSizes.sort((a, b) => a - b).find((s) => s >= requiredSpaceNeeded);
};

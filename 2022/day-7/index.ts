/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getInput } from '../../utils/index.js';
import { find } from 'lodash-es'
enum COMMANDS {
  CD = 'cd',
  LS = 'ls',
}

// some stuff to make it more readable
const PROMPT = '$';
const DIR = 'dir';
const DIR_ROOT = '/';
const DIR_UP = '..';

const MAX_FOLDER_SIZE = 100000;
const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_DISK_SPACE = 30000000;
const ROOT_FOLDER_ID = 1;

// crunching input
const input: string[] = getInput(2022, 7).split('\n');

let id = 0;
const getNodeId = () => {
  id++;
  return id;
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

const getFilesystem = (input: string[]): Node[] => {
  const fs: Node[] = [{ id: getNodeId(), name: DIR_ROOT, parentId: -1, type: TypeEnum.FOLDER }];
  let currentFolder = fs[0];
  input.forEach(line => {
    const cmd = line.split(' ');
    switch (cmd[0]) {
      // launching a command
      case PROMPT:
        // we don't care about ls
        if (cmd[1] === COMMANDS.LS) return;
        // changing directory
        if (cmd[1] === COMMANDS.CD) {
          if (cmd[2] === DIR_ROOT) {
            currentFolder = fs[0];
          } else if (cmd[2] === DIR_UP) {
            if (currentFolder.name === DIR_ROOT) return;
            currentFolder = find(fs, { id: currentFolder.parentId })!;
          } else {
            // a new directory
            currentFolder = find(fs, { parentId: currentFolder.id, name: cmd[2] })!
          }
        }
        break;
      // listing a directory, adding it to the tree
      case DIR:
        fs.push({ id: getNodeId(), name: cmd[1], parentId: currentFolder.id, type: TypeEnum.FOLDER });
        break;
      // listing a file
      default:
        fs.push({ id: getNodeId(), name: cmd[1], parentId: currentFolder.id, type: TypeEnum.FILE, size: parseInt(cmd[0]) });
        break;
    }
  });
  return fs;
}

const getFolderSize = (fs: Node[], nodeId: number): number =>
  fs.filter((node) => node.parentId === nodeId)
    .reduce((a, b) => a + (b.type === TypeEnum.FILE ? b.size : getFolderSize(fs, b.id)), 0);

export const firstPart = (): number => {
  // get the filesystem
  const fs = getFilesystem(input);
  // get folder sizes
  const folderSizes = fs
    .filter((node) => node.type === TypeEnum.FOLDER)
    .map((node) => getFolderSize(fs, node.id));
  // return the sum of folder sizes that are less than MAX_FOLDER_SIZE
  return folderSizes.filter((size) => size <= MAX_FOLDER_SIZE).reduce((a, b) => a + b, 0);
};

export const secondPart = (): number => {
  // reset id count...
  id = 0;
  const fs = getFilesystem(input);
  // get folder sizes
  const folderSizes = fs
    .filter((node) => node.type === TypeEnum.FOLDER)
    .map((node) => getFolderSize(fs, node.id));

  const requiredSpaceNeeded = REQUIRED_DISK_SPACE - (TOTAL_DISK_SPACE - getFolderSize(fs, ROOT_FOLDER_ID));
  // getting the first folder with space used >= space required
  return folderSizes.sort((a, b) => a - b).find((s) => s >= requiredSpaceNeeded);
};

// Import Node.js dependencies
import { opendir } from "fs/promises";
import { readdirSync } from "fs";
import path from "path";

// CONSTANTS
const kExcludedDirectory = new Set(["node_modules", ".vscode", ".git"]);

/**
 * @example
 * import { walk } from "@nodesecure/fs-walk";
 *
 * for await (const [dirent, location] of walk(__dirname) {
 *  if (dirent.isFile()) {
 *    console.log(location);
 *  }
 * }
 */
export async function* walk(directory, options = Object.create(null)) {
  const extensions = options?.extensions ?? null;
  const dirents = await opendir(directory);

  for await (const dirent of dirents) {
    if (kExcludedDirectory.has(dirent.name)) {
      continue;
    }

    if (dirent.isFile()) {
      if (extensions !== null && !extensions.has(path.extname(dirent.name))) {
        continue;
      }

      yield [dirent, path.join(directory, dirent.name)];
    }
    else if (dirent.isDirectory()) {
      const subDirectoryLocation = path.join(directory, dirent.name);

      yield [dirent, subDirectoryLocation];
      yield* walk(subDirectoryLocation, options);
    }
  }
}

/**
 * @example
 * import { walkSync, FILE } from "@nodesecure/fs-walk";
 *
 * for (const [type, location] of walkSync(__dirname) {
 *  if (type === FILE) {
 *    console.log(location);
 *  }
 * }
 */
export function* walkSync(directory, options = Object.create(null)) {
  const extensions = options?.extensions ?? null;
  const dirents = readdirSync(directory, { withFileTypes: true });

  for (const dirent of dirents) {
    if (kExcludedDirectory.has(dirent.name)) {
      continue;
    }

    if (dirent.isFile()) {
      if (extensions !== null && !extensions.has(path.extname(dirent.name))) {
        continue;
      }

      yield [dirent, path.join(directory, dirent.name)];
    }
    else if (dirent.isDirectory()) {
      const subDirectoryLocation = path.join(directory, dirent.name);

      yield [dirent, subDirectoryLocation];
      yield* walkSync(subDirectoryLocation, options);
    }
  }
}

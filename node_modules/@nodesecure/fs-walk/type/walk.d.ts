import { Dirent } from "fs";

export interface WalkOptions {
  extensions?: Set<string>;
}

export type WalkResult = [dirent: Dirent, absoluteFileLocation: string];

export declare function walk(directory: string, options?: WalkOptions): AsyncIterableIterator<WalkResult>;
export declare function walkSync(directory: string, options?: WalkOptions): IterableIterator<WalkResult>;
export {};

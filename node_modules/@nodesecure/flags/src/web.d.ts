
export type Flags =
  "isGit" |
  "isDeprecated" |
  "isOutdated" |
  "hasNativeCode" |
  "hasManifest" |
  "hasOutdatedDependency" |
  "hasWarnings" |
  "hasNoLicense" |
  "hasMultipleLicenses" |
  "hasMissingOrUnusedDependency" |
  "hasMinifiedCode" |
  "hasIndirectDependencies" |
  "hasCustomResolver" |
  "hasDependencies" |
  "hasExternalCapacity" |
  "hasScript" |
  "hasBannedFile";

export interface FlagObject {
  /** An emoji to visually identify the anomaly **/
  emoji: string;
  /** Title (or name) of the flag **/
  title: string;
  /** Short description/warning of the anomaly **/
  tooltipDescription: string;
}

export type Manifest = Record<string, FlagObject>;

export function getManifest(): Manifest;
export function getManifestEmoji(): IterableIterator<[Flags, string]>;
export function getEmojiFromTitle(title: Flags): string;
export function getFlags(): Record<string, string>;

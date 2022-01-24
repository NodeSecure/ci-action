// Import Internal Dependencies
import { FLAGS } from "./manifest.js";

const kNotFoundFlags = "🔴";
const kManifestEmoji = Object.fromEntries(getManifestEmoji());

/**
 * @description Export src/manifest.json
 */
export function getManifest() {
  return FLAGS;
}

/**
 * @example
 * const kManifestEmoji = Object.fromEntries(getManifestEmoji());
 */
export function* getManifestEmoji() {
  for (const { emoji, title } of Object.values(FLAGS)) {
    yield [title, emoji];
  }
}

export function getEmojiFromTitle(title) {
  return kManifestEmoji[title] ?? kNotFoundFlags;
}

/**
 * @description Complete list of flags title (as an ES6 Set)
 */
export function getFlags() {
  return new Set(Object.values(FLAGS).map((flagDescriptor) => flagDescriptor.title));
}

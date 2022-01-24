/* eslint-disable max-len */

/** @type {flags.Manifest} **/
export const FLAGS = {
  externalCapacity: {
    emoji: "🌍",
    title: "hasExternalCapacity",
    tooltipDescription: "The package use at least one Node.js dependency capable to communicate outside or to establish a listening server."
  },
  warnings: {
    emoji: "🚧",
    title: "hasWarnings",
    tooltipDescription: "The AST analysis has detected warnings (suspect import, unsafe regex ..)"
  },
  nativeCode: {
    emoji: "🐲",
    title: "hasNativeCode",
    tooltipDescription: "The package use native components (package, file, configuration)."
  },
  customResolver: {
    emoji: "💎",
    title: "hasCustomResolver",
    tooltipDescription: "The package has dependencies that are not packages."
  },
  noLicense: {
    emoji: "📜",
    title: "hasNoLicense",
    tooltipDescription: "The package does not seem to have a license."
  },
  multipleLicense: {
    emoji: "📚",
    title: "hasMultipleLicenses",
    tooltipDescription: "The package has multiple licenses in multiple files"
  },
  minifiedCode: {
    emoji: "🔬",
    title: "hasMinifiedCode",
    tooltipDescription: "The package seems to have files that are minified/uglified."
  },
  isDeprecated: {
    emoji: "⛔️",
    title: "isDeprecated",
    tooltipDescription: "The package is deprecated."
  },
  manyPublishers: {
    emoji: "👥",
    title: "hasManyPublishers",
    tooltipDescription: "The package has several publishers."
  },
  hasScript: {
    emoji: "📦",
    title: "hasScript",
    tooltipDescription: "has `post` and/or `pre` (un)install npm script"
  },
  indirectDependencies: {
    emoji: "🌲",
    title: "hasIndirectDependencies",
    tooltipDescription: "The package have indirect dependencies."
  },
  isGit: {
    emoji: "☁️",
    title: "isGit",
    tooltipDescription: "The package (project) is a git repository"
  },
  vulnerabilities: {
    emoji: "🚨",
    title: "hasVulnerabilities",
    tooltipDescription: "The package have one or many vulnerabilities."
  },
  missingOrUnusedDependency: {
    emoji: "👀",
    title: "hasMissingOrUnusedDependency",
    tooltipDescription: "A dependency is missing in package.json or a dependency is installed but never used!"
  },
  isDead: {
    emoji: "💀",
    title: "isDead",
    tooltipDescription: "The dependency has not received update from at least one year!"
  },
  bannedFile: {
    emoji: "⚔️",
    title: "hasBannedFile",
    tooltipDescription: "The project has at least one sensitive file."
  },
  outdated: {
    emoji: "⌚️",
    title: "isOutdated",
    tooltipDescription: "The current package version is not equal to the package latest version!"
  },
  duplicated: {
    emoji: "🎭",
    title: "isDuplicated",
    tooltipDescription: "The package is also used somewhere else in the dependency tree but with a different version"
  }
};

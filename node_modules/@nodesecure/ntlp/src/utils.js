// Node.js dependencies
import { fileURLToPath } from "url";
import { dirname } from "path";


// CONSTANTS
const kLicenses = new Map([
  ["BSD 3-Clause", "BSD 3-Clause"],
  ["BSD ", "BSD"],
  ["ISC ", "ISC"],
  ["Apache License", "Apache"],
  ["Mozilla", "Mozilla"],
  ["LGPL ", "LGPL"],
  ["Affero ", "GPL"],
  ["GPL ", "GPL"],
  ["Eclipse", "Eclipse"],
  ["Artistic", "Artistic"],
  ["DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE", "WTF"],
  ["MIT ", "MIT"]
]);

// code from https://github.com/cutenode/liblice/blob/master/lib/parseLicense.js
export function parsePackageLicense(file) {
  if (file.license !== undefined) {
    if (typeof file.license === "string") {
      return handleUndefinedAndNull(file.license);
    }

    if (typeof file.license === "object") {
      return handleUndefinedAndNull(file.license.type);
    }
  }

  if (file.licenses !== undefined) {
    if (Array.isArray(file.licenses)) {
      return handleUndefinedAndNull(file.licenses[0].type);
    }

    if (typeof file.licenses === "object") {
      return handleUndefinedAndNull(file.licenses.type);
    }
  }

  return handleUndefinedAndNull(undefined);
}

export function getLicenseFromString(str) {
  for (const [name, licenseName] of kLicenses.entries()) {
    if (str.indexOf(name) > -1) {
      return licenseName;
    }
  }

  return "unknown license";
}

export function handleUndefinedAndNull(licenseString) {
  if (licenseString === undefined) {
    return "invalid license";
  }

  return licenseString;
}

export function getDirNameFromUrl(url = import.meta.url) {
  const __filename = fileURLToPath(url);

  return dirname(__filename);
}

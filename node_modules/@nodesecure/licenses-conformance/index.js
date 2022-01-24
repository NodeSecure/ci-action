// Import Third-party Dependencies
import parseExpressions from "spdx-expression-parse";

// Import Internal Dependencies
import { checkSpdx, checkEveryTruthy, checkSomeTruthy, createSpdxLink } from "./src/utils.js";

export default (licenseID) => {
  if (typeof licenseID !== "string") {
    throw new TypeError("expecter licenseID to be a strnig");
  }

  try {
    const data = parseExpressions(licenseID);

    return handleLicenseCase(data);
  }
  catch (err) {
    const data = {
      error: true,
      errorMessage: `Passed license expression was not a valid license expression. Error from spdx-expression-parse: ${err}`
    };

    return handleLicenseCase(data);
  }
};

function handleLicenseCase(data) {
  if (data.error) {
    throw new Error(data.errorMessage);
  }

  const licenses = {
    uniqueLicenseIds: [],
    spdxLicenseLinks: [],
    spdx: {
      osi: false,
      fsf: false,
      fsfAndOsi: false,
      includesDeprecated: false
    }
  };

  if (typeof data.license === "string") {
    const spdxCheck = checkSpdx(data.license);
    licenses.spdx = spdxCheck;

    licenses.uniqueLicenseIds.push(data.license);
    licenses.spdxLicenseLinks.push(createSpdxLink(data.license));
  }
  else if (typeof data.right.license === "string") {
    const spdxCheckLeft = checkSpdx(data.left.license);
    const spdxCheckRight = checkSpdx(data.right.license);

    licenses.spdx.osi = checkEveryTruthy(spdxCheckLeft.osi, spdxCheckRight.osi);
    licenses.spdx.fsf = checkEveryTruthy(spdxCheckLeft.fsf, spdxCheckRight.fsf);
    licenses.spdx.fsfAndOsi = checkEveryTruthy(spdxCheckLeft.fsfAndOsi, spdxCheckRight.fsfAndOsi);
    licenses.spdx.includesDeprecated = checkSomeTruthy(spdxCheckLeft.includesDeprecated, spdxCheckRight.includesDeprecated);

    licenses.uniqueLicenseIds.push(
      data.left.license,
      data.right.license
    );

    licenses.spdxLicenseLinks.push(
      createSpdxLink(data.left.license),
      createSpdxLink(data.right.license)
    );
  }
  else if (typeof data.right.left.license === "string") {
    const spdxCheckLeft = checkSpdx(data.left.license);
    const spdxCheckRightLeft = checkSpdx(data.right.left.license);
    const spdxCheckRightRight = checkSpdx(data.right.right.license);

    licenses.spdx.osi = checkEveryTruthy(spdxCheckLeft.osi, spdxCheckRightLeft.osi, spdxCheckRightRight.osi);
    licenses.spdx.fsf = checkEveryTruthy(spdxCheckLeft.fsf, spdxCheckRightLeft.fsf, spdxCheckRightRight.fsf);
    licenses.spdx.fsfAndOsi = checkEveryTruthy(
      spdxCheckLeft.fsfAndOsi, spdxCheckRightLeft.fsfAndOsi, spdxCheckRightRight.fsfAndOsi);
    licenses.spdx.includesDeprecated = checkSomeTruthy(
      spdxCheckLeft.includesDeprecated, spdxCheckRightLeft.includesDeprecated, spdxCheckRightRight.includesDeprecated);

    licenses.uniqueLicenseIds.push(
      data.left.license,
      data.right.left.license,
      data.right.right.license
    );

    licenses.spdxLicenseLinks.push(
      createSpdxLink(data.left.license),
      createSpdxLink(data.right.left.license),
      createSpdxLink(data.right.right.license)
    );
  }

  return licenses;
}

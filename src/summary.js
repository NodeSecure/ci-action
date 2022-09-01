// Import Third-party dependencies
import core from "@actions/core";

const kSuccessEmoji = "✅";
const kFailureEmoji = "❌";
const kInfoEmoji = "🟡";
const kNodeSecureLogoSrc =
  "https://avatars.githubusercontent.com/u/85318671?s=96&v=4";
const kActionBadges = [
  "https://img.shields.io/badge/Maintained%3F-yes-green.svg",
  "https://img.shields.io/github/license/Naereen/StrapDown.js.svg",
  "https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/ci-action/master/package.json&query=$.version&label=Version",
];

function generateOutcomeEmoji(reportData, hasSpecificOutcome) {
  if (hasSpecificOutcome) {
    const warnings = core.getInput("warnings");
    if (warnings === "warning") {
      return `${kInfoEmoji} ${reportData.length}`;
    } else if (warnings === "off") {
      return "(skipped)";
    }
  }

  if (reportData.length === 0) {
    return `${kSuccessEmoji} 0`;
  }

  return `${kFailureEmoji} ${reportData.length}`;
}

function generateOutcomeGlobalWarnings(globalWarnings) {
  return `<ul>
      ${globalWarnings.map((warning) => `<li>${warning}</li>`).join("")}
    </ul>`;
}

function generateOutcomeDepsWarnings(depsWarnings) {
  return `
    <br />
    <table>
      <tbody>
        <tr>
          <th>Package</th>
          <th>Kind</th>
          <th>File</th>
          <th>Location</th>
        </tr>
          ${depsWarnings
            .flatMap(({ warnings, package: packageName }) =>
              warnings.map((warning) => {
                const location = warning.location.flatMap((location) =>
                  location.join(":")
                );
                return `<tr>
                  <td>${packageName}</td>
                  <td>${warning.kind}</td>
                  <td>${warning.file}</td>
                  <td>${location}</td>
                  </tr>`;
              })
            )
            .join("")}
        </tbody>
      </table>
  `;
}

function generateOutcomeVulns(vulns) {
  return `
    <br />
    <table>
      <tbody>
        <tr>
          <th>Package</th>
          <th>Severity</th>
          <th>Title</th>
          <th>Ranges</th>
        </tr>
        ${vulns
          .map((vuln) => {
            const vulnRanges = vuln.vulnerableRanges.join(", ");
            return `<tr>
                <td>${vuln.package}</td>
                <td><${vuln.severity}</td>
                <td>${vuln.title}</td>
                <td>${vulnRanges}</td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function generateOutcomeTitle(report) {
  const isReportSuccessful = report.status === "success";
  const emojiOutcome = isReportSuccessful ? kSuccessEmoji : kFailureEmoji;
  const outcomeStatus = isReportSuccessful ? "successful" : "failed";
  return `${emojiOutcome} [${report.status.toUpperCase()}]: @nodesecure/ci security checks ${outcomeStatus}.`;
}

export async function generateSummary(report) {
  const vulns = report.data.dependencies.vulnerabilities;
  const depsWarnings = report.data.dependencies.warnings;
  const globalWarnings = report.data.warnings;

  await core.summary
    .addImage(kNodeSecureLogoSrc, "NodeSecure", { width: 50, height: 50 })
    .addHeading(generateOutcomeTitle(report), 3)
    .addTable([
      [
        { data: "Global warnings", header: true },
        { data: "Dependency warnings", header: true },
        { data: "Dependency vulnerabilities", header: true },
      ],
      [
        generateOutcomeEmoji(globalWarnings),
        generateOutcomeEmoji(depsWarnings, true),
        generateOutcomeEmoji(vulns),
      ],
    ])
    .addBreak();

  if (globalWarnings.length > 0) {
    await core.summary.addDetails(
      `[${generateOutcomeEmoji(globalWarnings)}] Global warnings:`,
      generateOutcomeGlobalWarnings(globalWarnings)
    );
    await core.summary.addSeparator();
  }

  if (depsWarnings.length > 0) {
    await core.summary.addDetails(
      `[${generateOutcomeEmoji(depsWarnings, true)}] Dependencies warnings:`,
      generateOutcomeDepsWarnings(depsWarnings)
    );
    await core.summary.addSeparator();
  }

  if (vulns.length > 0) {
    await core.summary.addDetails(
      `[${generateOutcomeEmoji(vulns)}] Dependencies vulnerabilities:`,
      generateOutcomeVulns(vulns)
    );
    await core.summary.addSeparator();
  }

  for (const badgeSrc of kActionBadges) {
    await core.summary.addImage(badgeSrc);
  }

  await core.summary
    .addLink(
      "View @nodesecure/ci documentation",
      "https://github.com/NodeSecure/ci"
    )
    .write();
}

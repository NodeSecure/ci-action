import core from "@actions/core";
import { runPipeline } from "@nodesecure/ci";

const directory = core.getInput("directory") ?? process.env.GITHUB_WORKSPACE;
const strategy = core.getInput("strategy");
const vulnerabilities = core.getInput("vulnerabilities");
const warnings = core.getInput("warnings");
const reporters = core.getInput("reporters");

function generateOutcomeWithEmoji(reportData, hasSpecificOutcome) {
  if (hasSpecificOutcome) {
    if (warnings === "warning") {
      return `🟡 ${reportData.length}`;
    } else if (warnings === "off") {
      return "(skipped)";
    }
  }

  if (reportData.length === 0) {
    return `✅ 0`;
  }

  return `❌ ${reportData.length}`;
}

function generateOutcomeDepsWarnings(depsWarnings) {
  return depsWarnings.flatMap(({ warnings, package: packageName }) =>
    warnings.map((warning) => {
      const location = warning.location.flatMap((location) =>
        location.join(":")
      );
      return `${packageName} from ${warning.file}:${location}`;
    })
  );
}

function generateOutcomeVulns(vulns) {
  return vulns.map((vuln) => {
    const vulnRanges = vuln.vulnerableRanges.join(", ");

    return `[${vuln.severity}] ${vuln.package}: ${vuln.title} ${vulnRanges}`;
  });
}

try {
  const result = await runPipeline({
    warnings,
    strategy,
    reporters,
    directory,
    vulnerabilities,
    autoExitAfterFailure: false,
  });

  const vulns = result.data.dependencies.vulnerabilities;
  const depsWarnings = result.data.dependencies.warnings;
  const globalWarnings = result.data.warnings;
  const isReportSuccessful = result.status === "success";

  await core.summary
    .addHeading(
      `${
        isReportSuccessful ? "✅" : "❌"
      } [${result.status.toUpperCase()}]: @nodesecure/ci analysis`
    )
    .addTable([
      [
        { data: "Global warnings", header: true },
        { data: "Dependency warnings", header: true },
        { data: "Dependency vulnerabilities", header: true },
      ],
      [
        generateOutcomeWithEmoji(globalWarnings),
        generateOutcomeWithEmoji(depsWarnings, true),
        generateOutcomeWithEmoji(vulns),
      ],
    ])
    .addBreak();

  if (vulns.length > 0) {
    await core.summary
      .addHeading(
        `(${generateOutcomeWithEmoji(vulns)}) Dependencies vulnerabilities:`
      )
      .addList(generateOutcomeVulns(vulns));
    await core.summary.addSeparator();
  }

  if (globalWarnings.length > 0) {
    await core.summary
      .addHeading(
        `(${generateOutcomeWithEmoji(globalWarnings)}) Global warnings:`
      )
      .addList(globalWarnings);
    await core.summary.addSeparator();
  }

  if (depsWarnings.length > 0) {
    await core.summary
      .addHeading(
        `(${generateOutcomeWithEmoji(
          depsWarnings,
          true
        )}) Dependencies warnings:`
      )
      .addList(generateOutcomeDepsWarnings(depsWarnings));
  }

  await core.summary
    .addSeparator()
    .addLink(
      "View @nodesecure/ci documentation",
      "https://github.com/NodeSecure/ci"
    )
    .write();

  if (result.status === "failure") {
    core.setFailed(`[FAILURE]: @nodesecure/ci checks failed.`);
  }
} catch (error) {
  core.setFailed(`[UNCAUGHT_ERROR]: ${error.message}`);
}

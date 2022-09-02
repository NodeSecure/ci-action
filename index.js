// Import Third-party dependencies
import core from "@actions/core";
import { runPipeline } from "@nodesecure/ci";

// Import Internal Dependencies
import { generateSummary } from "./src/summary.js";

const directory = core.getInput("directory") ?? process.env.GITHUB_WORKSPACE;
const strategy = core.getInput("strategy");
const vulnerabilities = core.getInput("vulnerabilities");
const warnings = core.getInput("warnings");
const reporters = core.getInput("reporters");

try {
  const report = await runPipeline({
    warnings,
    strategy,
    reporters,
    directory,
    vulnerabilities,
    autoExitAfterFailure: false,
  });

  await generateSummary(report);

  if (report.status === "failure") {
    core.setFailed(`[FAILURE]: @nodesecure/ci checks failed.`);
  }
} catch (error) {
  core.setFailed(`[UNCAUGHT_ERROR]: ${error.message}`);
}

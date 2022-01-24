import core from "@actions/core";
import { runPipeline } from "@nodesecure/ci";

const directory = core.getInput("directory") ?? process.env.GITHUB_WORKSPACE;
const strategy = core.getInput("strategy");
const vulnerabilities = core.getInput("vulnerabilities");
const warnings = core.getInput("warnings");
const reporters = core.getInput("reporters");

try {
  await runPipeline({
    warnings,
    strategy,
    reporters,
    directory,
    vulnerabilities,
  });
} catch (error) {
  core.setFailed(`[UNCAUGHT_ERROR]: ${error.message}`);
}
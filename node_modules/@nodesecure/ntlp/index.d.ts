// Import Third-party Dependencies
import { license } from "@nodesecure/licenses-conformance";

interface NtlpResult {
  /**
   * List of license (with their SPDX conformance)
   */
  licenses: license[];
  /**
   * Has multiple unique licenses (MIT, ISC ..)
   */
  hasMultipleLicenses: boolean;
  /**
   * Unique list of license (MIT, ISC). The list cannot contain duplicate.
   */
  uniqueLicenseIds: string[];
}

declare function ntlp(tarballDir: string): Promise<NtlpResult>;

export { license, NtlpResult };
export = ntlp;

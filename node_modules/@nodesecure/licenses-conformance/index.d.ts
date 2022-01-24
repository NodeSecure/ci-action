export interface complianceOptions {
  throwOnError: boolean;
}

export interface license {
  uniqueLicenseIds: string[];
  spdxLicenseLinks: string[];
  spdx?: {
    osi: boolean;
    fsf: boolean;
    fsfAndOsi: boolean;
    includesDeprecated: boolean;
  };
}

export interface licenseError {
  license: string;
  error: string;
}

export declare function compliance(licenseID: string, options: complianceOptions): Promise<license | licenseError>
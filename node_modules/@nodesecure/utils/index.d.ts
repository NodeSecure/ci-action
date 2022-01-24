
export function formatBytes(bytes: number): string;
export function locationToString(location: string): string;
export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
export function manifestAuthorRegex(): RegExp;
export function parseManifestAuthor(str: string): { name: string, email?: string, url?: string };

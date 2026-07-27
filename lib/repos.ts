import { SITE } from "./site";

/**
 * The actual public repositories in the GitHub organization.
 *
 * Chapter 25 sketches a hypothetical layout ("a typical organization may
 * appear as follows") with names like `openfiat-program` and `sdk-rust` that
 * were never used. This list is the real one, so the site points people at
 * repositories that exist.
 */
export type RepoId =
  | "openfiat-specs"
  | "openfiat-core"
  | "openfiat-sdks"
  | "openfiat-apps"
  | "openfiat-app"
  | "openfiat-org"
  | "openfiat-docs"
  | "openfiat-devtools"
  | "openfiat-infra"
  | "awesome-openfiat";

export type Repo = {
  id: RepoId;
  /** Primary language as GitHub reports it. */
  language: string;
};

export const REPOS: Repo[] = [
  { id: "openfiat-specs", language: "Markdown" },
  { id: "openfiat-core", language: "Rust" },
  { id: "openfiat-sdks", language: "Rust · TypeScript · Python" },
  { id: "openfiat-app", language: "TypeScript" },
  { id: "openfiat-apps", language: "TypeScript" },
  { id: "openfiat-devtools", language: "Rust" },
  { id: "openfiat-infra", language: "Terraform · Helm" },
  { id: "openfiat-docs", language: "TypeScript" },
  { id: "openfiat-org", language: "TypeScript" },
  { id: "awesome-openfiat", language: "Community" },
];

export function repoUrl(id: RepoId): string {
  return `${SITE.githubOrg}/${id}`;
}

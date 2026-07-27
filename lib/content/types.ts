export type SpecMeta = {
  documentId: string | null;
  title: string | null;
  version: string | null;
  status: string | null;
  category: string | null;
  dependsOn: string[];
};

export type Chapter = {
  kind: "chapter";
  order: number;
  slug: string;
  title: string;
  heading: string;
  description: string;
  body: string;
};

export type Spec = {
  kind: "spec";
  id: string;
  number: number;
  slug: string;
  title: string;
  heading: string;
  description: string;
  body: string;
  meta: SpecMeta | null;
  family: string;
};

export type ContentBundle = {
  ref: string;
  chapters: Chapter[];
  specs: Spec[];
};

export type TocEntry = {
  id: string;
  text: string;
  depth: 2 | 3;
};

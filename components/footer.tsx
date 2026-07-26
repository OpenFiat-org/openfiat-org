import Link from "next/link";

const COLUMNS: Array<[string, Array<[string, string]>]> = [
  [
    "Project",
    [
      ["Protocol", "/protocol"],
      ["Roadmap", "/roadmap"],
      ["Foundation", "/foundation"],
      ["Careers", "/careers"],
    ],
  ],
  [
    "Resources",
    [
      ["Documentation", "/documentation"],
      ["Downloads", "/downloads"],
      ["Status", "/status"],
      ["Press", "/press"],
    ],
  ],
  [
    "Community",
    [
      ["Community", "/community"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
    ],
  ],
  [
    "Legal",
    [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  ],
];

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-brand-hover">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl border-t border-white/10 px-6 py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} AllenHark. OpenFiat is an open protocol
        released under the Apache License 2.0.
      </div>
    </footer>
  );
}

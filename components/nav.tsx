import Image from "next/image";
import Link from "next/link";

const LINKS: Array<[string, string]> = [
  ["Protocol", "/protocol"],
  ["Developers", "/developers"],
  ["Merchants", "/merchants"],
  ["Documentation", "/documentation"],
  ["Downloads", "/downloads"],
  ["Roadmap", "/roadmap"],
  ["Community", "/community"],
  ["Foundation", "/foundation"],
  ["Blog", "/blog"],
];

export function Nav() {
  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
        >
          <Image src="/logo.png" alt="" width={28} height={28} priority />
          OpenFiat
        </Link>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-brand-hover">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

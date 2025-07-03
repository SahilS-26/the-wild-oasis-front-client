import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  const NAV_LINKS = [
    {
      id: 1,
      name: "Cabins",
      query: "cabins",
      url: "/cabins",
    },
    {
      id: 2,
      name: "About",
      query: "about",
      url: "/about",
    },
    {
      id: 3,
      name: "Guest Area",
      query: "account",
      url: "/account",
    },
  ];

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {NAV_LINKS.map((nav) => (
          <li key={nav.id}>
            {nav.query === "account" && session?.user?.image ? (
              <Link
                href={nav.url}
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <img
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  referrerPolicy="no-referrer"
                  className="h-8 rounded-full"
                />
                <span>{nav.name}</span>
              </Link>
            ) : (
              <Link
                href={nav.url}
                className="hover:text-accent-400 transition-colors"
              >
                {nav.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

import Link from "next/link";

export default function Navigation() {
  const NAV_LINKS = [
    {
      id: 1,
      name: "Cabins",
      url: "/cabins",
    },
    {
      id: 2,
      name: "About",
      url: "/about",
    },
    {
      id: 3,
      name: "Guest Area",
      url: "/account",
    },
  ];

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {NAV_LINKS.map((nav) => (
          <li key={nav.id}>
            <Link
              href={nav.url}
              className="hover:text-accent-400 transition-colors"
            >
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

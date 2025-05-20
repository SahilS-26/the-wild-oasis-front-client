import Link from "next/link";

export default function Navigation() {
  const NAV_LINKS = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Cabins",
      link: "/cabins",
    },
    {
      id: 3,
      name: "About",
      link: "/about",
    },
    {
      id: 4,
      name: "Your account",
      link: "/account",
    },
  ];

  return (
    <ul>
      {NAV_LINKS.map((nav) => (
        <li key={nav.id}>
          <Link href={nav.link}>{nav.name}</Link>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTERS = [
  {
    id: 1,
    name: "All Cabins",
    query: "all",
  },
  {
    id: 2,
    name: "1-3 guests",
    query: "small",
    min: 3,
  },
  {
    id: 3,
    name: "4-7 guests",
    query: "medium",
  },
  {
    id: 4,
    name: "8-12 guests",
    query: "large",
  },
];

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    console.log(filter);
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilter(filter.query)}
          className={`px-5 py-2  hover:bg-primary-700 ${
            activeFilter === filter.query
              ? "bg-primary-700 text-primary-50"
              : ""
          }`}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}

export default Filter;

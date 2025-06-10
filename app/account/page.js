import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function page() {
  const session = await auth();
  const name = session?.user?.name;

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {name}
    </h2>
  );
}

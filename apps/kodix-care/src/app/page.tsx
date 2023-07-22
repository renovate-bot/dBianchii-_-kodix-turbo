import { helpers } from "~/utils/proxy";

export default async function HomePage() {
  const data = await helpers.app.getAll.fetch();

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {JSON.stringify(data)}
    </main>
  );
}

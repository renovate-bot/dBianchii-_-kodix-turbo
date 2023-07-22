import { helpers } from "~/utils/proxy";
import Client from "./Client";

export default async function HomePage() {
  await helpers.test.test.prefetch({ source: "server" });
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Client />
    </main>
  );
}

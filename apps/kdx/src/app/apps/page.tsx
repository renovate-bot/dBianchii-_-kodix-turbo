import { auth } from "@kdx/auth";
import { prisma } from "@kdx/db";
import { H1, Lead } from "@kdx/ui";

import KodixApp from "~/components/App/KodixApp";

export default async function Apps() {
  const session = await auth();
  const apps = await prisma.app.findMany({
    include: {
      activeWorkspaces: {
        where: {
          id: session.user.activeWorkspaceId,
        },
      },
    },
  });

  return (
    <div className="p-4">
      <H1>Your installed apps</H1>
      <Lead className="mt-2">These are your installed apps</Lead>
      <br />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {apps?.map((app) => (
          <div key={app.id}>
            <KodixApp
              id={app.id}
              appName={app.name}
              appDescription={app.description}
              appUrl={app.urlApp}
              installed={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

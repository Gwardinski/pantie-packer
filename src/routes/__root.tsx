import { AppBackground } from "@/components/AppBackground";
import { ContactInfo } from "@/components/ContactInfo";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen w-screen items-center justify-center text-zinc-950 dark:text-zinc-50">
      <AppBackground />

      <main className="flex h-full w-full max-w-[1600px] flex-col gap-16 lg:flex-row lg:gap-0">
        <header className="flex w-full flex-col justify-center gap-4 glass px-2 pt-16 pb-12 text-center lg:w-2/5 lg:gap-8 lg:px-8 lg:px-16 lg:pt-0 lg:pb-40 dark:dark-glass">
          <h1 className="font-serif text-4xl font-bold tracking-wide lg:text-5xl">
            Pantie Packer
          </h1>
          <h2 className="font-serif text-2xl tracking-wide lg:pt-2">
            Pack your panties using the power of <del>AI</del>{" "}
            <strong>mathematics</strong>.
          </h2>
          <p className="max-w-xl self-center pt-4 font-serif lg:pt-8">
            In a world of AI charlatans and overhyped jargon, trust in the power
            of traditional, tried & tested formulas to ensure you can pack for
            your trip-away with confidence.
          </p>
          <div className="mt-8 hidden w-full justify-center gap-4 lg:mt-16 lg:flex">
            <ContactInfo />
          </div>
        </header>
        <section className="flex w-full flex-col items-center justify-center gap-8 px-8 lg:w-3/5 lg:px-0 lg:pb-0 lg:pb-32">
          <Outlet />
        </section>

        <footer className="flex justify-center py-16 lg:hidden">
          <ContactInfo />
        </footer>
      </main>

      <TanStackRouterDevtools />
    </div>
  ),
});

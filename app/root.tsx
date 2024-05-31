import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import { themeSessionResolver } from "./sessions.server";
import "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Pantie Packer" },
    {
      name: "PantiePacker",
      content: "How many panties should you pack for your trip away?",
    },
  ];
};

export type RootLoader = typeof loader;
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);

  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const { theme: sessionTheme } = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(sessionTheme)} />
        <Links />
      </head>
      <body>
        <div className="fixed left-0 top-0 -z-10 h-screen min-h-screen w-screen bg-[url('/bg.jpeg')] bg-cover bg-fixed bg-center blur-md" />
        <main className="flex flex-col items-center justify-start gap-8 pb-96 text-red-950 lg:gap-16 lg:py-16 dark:text-zinc-50">
          <header className="glass dark:dark-glass flex flex-col gap-4 rounded-xl px-8 py-8 text-left lg:px-16 lg:text-center">
            <h1 className="text-5xl font-bold">Pantie Packer</h1>
            <h2 className="text-3xl">
              Pack your panties using the power of <del>AI</del>{" "}
              <strong>mathematics</strong>.
            </h2>
            <p className="max-w-xl self-center lg:pt-4">
              In a world of AI charlatans and overhyped jargon, we use the power
              of traditional, tried & tested formulas to ensure you can pack for
              your trip away with confidence.
            </p>
          </header>

          <Outlet />

          <footer className="fixed bottom-0 flex w-full justify-end">
            <ThemeToggle />
          </footer>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

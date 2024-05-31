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
import { CoffeeIcon, GithubIcon } from "lucide-react";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import { Button } from "./components/ui";
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
      <body className="flex h-screen w-screen items-center justify-center bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="animate-fadeIn fixed left-0 top-0 -z-20 h-screen min-h-screen w-screen bg-[url('/bg4.JPG')] bg-cover bg-fixed bg-center blur-sm dark:bg-[url('/bg1.JPG')]" />

        <main className="flex h-full w-full max-w-[1600px] flex-col gap-16 lg:flex-row lg:gap-0">
          <header className="glass dark:dark-glass flex w-full flex-col justify-center gap-4 px-8 pb-12 pt-16 text-center lg:w-2/5 lg:px-16 lg:pb-40 lg:pt-0">
            <h1 className="font-serif text-5xl font-bold tracking-wide">
              Pantie Packer
            </h1>
            <h2 className="font-serif text-2xl tracking-wide">
              Pack your panties using the power of <del>AI</del>{" "}
              <strong>mathematics</strong>.
            </h2>
            <p className="max-w-xl self-center pt-4 font-serif lg:pt-8">
              In a world of AI charlatans and overhyped jargon, trust in the
              power of traditional, tried & tested formulas to ensure you can
              pack for your trip-away with confidence.
            </p>
            <div className="mt-8 hidden w-full justify-center gap-4 lg:mt-16 lg:flex">
              <ContactInfo />
            </div>
          </header>
          <section className="flex w-full flex-col items-center justify-center gap-8 px-8 pb-32 lg:w-3/5 lg:px-0 lg:pb-0">
            <Outlet />
          </section>

          <footer className="flex justify-center py-16 lg:hidden">
            <ContactInfo />
          </footer>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const ContactInfo = () => {
  return (
    <div className="flex w-full justify-center gap-4">
      <ThemeToggle />
      <Button size="icon" variant="outline" asChild>
        <a
          href="https://github.com/Gwardinski/pantie-packer"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </Button>
      <Button size="icon" variant="outline" asChild>
        <a
          href="https://buymeacoffee.com/gwardinski"
          target="_blank"
          rel="noreferrer"
        >
          <CoffeeIcon />
        </a>
      </Button>
    </div>
  );
};

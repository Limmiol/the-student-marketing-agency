import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const AboutPage = lazyRouteComponent(() =>
  import("../pages/aboutPage").then((mod) => ({ default: mod.AboutPage })),
);

export const Route = createFileRoute("/about")({ component: AboutPage });

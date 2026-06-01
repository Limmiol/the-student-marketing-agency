import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const ContactPage = lazyRouteComponent(() =>
  import("../pages/contactPage").then((mod) => ({ default: mod.ContactPage })),
);

export const Route = createFileRoute("/contact")({ component: ContactPage });

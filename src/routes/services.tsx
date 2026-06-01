import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const ServicesPage = lazyRouteComponent(() =>
  import("../pages/servicesPage").then((mod) => ({ default: mod.ServicesPage })),
);

export const Route = createFileRoute("/services")({ component: ServicesPage });

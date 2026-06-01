import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/pages/eventsPage";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

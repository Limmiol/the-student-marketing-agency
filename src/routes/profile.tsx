import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/profilePage";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

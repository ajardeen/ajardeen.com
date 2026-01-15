// types/ai-status.ts
import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

export type BadgeVariant = VariantProps<
  typeof badgeVariants
>["variant"];

export type AiStatus =
  | { state: "loading"; text: "checking"; variant: "secondary" }
  | { state: "online"; text: "online"; variant: "success" }
  | { state: "offline"; text: "offline"; variant: "error" }
  | { state: "limited"; text: "limit reached"; variant: "pending" };

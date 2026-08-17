import { createClient } from "@insforge/sdk";

const baseUrl =
  process.env.NEXT_PUBLIC_INSFORGE_URL ||
  "https://xhuahh74.ap-southeast.insforge.app";

const anonKey =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  "anon_7df75ba5fa238b76b4298bd52a60f0d60552a0c4c9cdcb485df8d300429d7d6f";

export const insforge = createClient({
  baseUrl,
  anonKey,
});

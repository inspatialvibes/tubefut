import { defineAPIGroup } from "@inspatial/cloud";

/*################################(DEFINE API)################################*/

export const tubefutAPI = defineAPIGroup("tubefut", {
  label: "Tubefut API",
  description: "API actions for tubefut",
});

/*################################(PING)################################*/

tubefutAPI.addAction("ping", {
  label: "Ping",
  description: "Health check action",
  action: () => ({ ok: true }),
  params: [],
});

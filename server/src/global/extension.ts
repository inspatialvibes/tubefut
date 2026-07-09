import { defineExtension } from "@inspatial/cloud";
import { tubefutAPI } from "../app/api.ts";
import { tubefutEntry } from "../app/entry.ts";
import { tubefutSettings } from "../app/settings.ts";

/*################################(DEFINE EXTENSION)################################*/

export const TubefutExtension = defineExtension("Tubefut", {
  label: "Tubefut",
  version: "1.0.0",
  description: "Cloud extension for tubefut",
  entryTypes: [tubefutEntry],
  apiGroups: [tubefutAPI],
  settingsTypes: [tubefutSettings],
});

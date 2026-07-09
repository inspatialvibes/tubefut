import { defineSettings } from "@inspatial/cloud";

/*################################(DEFINE SETTINGS)################################*/

export const tubefutSettings = defineSettings("tubefutSettings", {
  label: "Tubefut Settings",
  description: "Global settings for tubefut",
  fields: [
    {
      key: "enabled",
      label: "Enabled",
      type: "BooleanField",
      defaultValue: true,
    },
  ],
});

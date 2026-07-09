import { defineEntry } from "@inspatial/cloud";

/*################################(DEFINE ENTRY)################################*/

export const tubefutEntry = defineEntry("tubefut", {
  label: "Tubefut",
  description: "Primary entry for tubefut",
  titleField: "title",
  defaultListFields: ["title", "status"],
  fields: [
    {
      key: "title",
      type: "TextField",
      required: true,
      description: "Display title",
    },
    {
      key: "status",
      type: "ChoicesField",
      defaultValue: "draft",
      choices: [
        { key: "draft", label: "Draft" },
        { key: "published", label: "Published" },
      ],
    },
  ],
});

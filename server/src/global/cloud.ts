import { createInCloud } from "@inspatial/cloud";
import { TubefutExtension } from "./extension.ts";

createInCloud("tubefut", [
  TubefutExtension,
]);

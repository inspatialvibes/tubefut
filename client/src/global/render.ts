
/*################################(CREATE INSPATIAL RENDERER)################################*/

createRenderer({
  root: () => import("./root.tsx").then((m) => m.GlobalRoot),
  mount: "#app",
  mode: "auto",
  debug: "minimal",
  globalGuard: true,
  extensions: [
    InTrigger(),
    InTheme({ format: GlobalTheme }),
    InRoute(),
    InPresentation(),
    InMotion(),
    InCloud({ reconnect: "reload" }),
  ],
});

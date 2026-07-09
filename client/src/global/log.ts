
/*################################(CREATE LOG)################################*/
export const GlobalLog: LogProps = await createLog({
  name: "InSpatial",
  subject: "App",
}).catch(() => console as unknown as LogProps);

export const log = GlobalLog;


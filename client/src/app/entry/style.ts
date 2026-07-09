/*################################(CREATE STYLE)################################*/

export const EntryStyle = {
  /*===================== Root ======================*/
  root: createStyle({
    name: "entry-root",
    base: [
      {
        web: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
        },
      },
    ],
  }),

  /*===================== Text ======================*/
  text: createStyle({
    name: "entry-text",
    base: [
      {
        web: {
          fontSize: "42px",
        },
      },
    ],
  }),
};

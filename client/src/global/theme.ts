/*######################################(CREATE THEME)######################################*/

export const GlobalTheme = createTheme({
  root: {
    "--brand": "hsla(350, 100%, 58%, 1)",
    "--accent": "hsla(45, 100%, 66%, 1)",
    "--success": "hsla(164, 74%, 43%, 1)",

    "--window": "hsla(42, 100%, 96%, 0.72)",
    "--surface": "hsla(42, 100%, 98%, 0.88)",
    "--background": "hsla(44, 68%, 95%, 1)",
    "--primary": "hsla(34, 76%, 8%, 1)",
    "--secondary": "hsla(44, 86%, 76%, 1)",
    "--muted": "hsla(43, 55%, 86%, 1)",
    "--invert": "hsla(40, 28%, 5%, 1)",
  },
  dark: {
    "--window": "hsla(42, 52%, 7%, 0.72)",
    "--surface": "hsla(38, 44%, 10%, 0.82)",
    "--background": "hsla(40, 46%, 4%, 1)",
    "--primary": "hsla(44, 100%, 91%, 1)",
    "--secondary": "hsla(43, 84%, 49%, 1)",
    "--muted": "hsla(166, 38%, 15%, 0.72)",
    "--invert": "hsla(40, 24%, 5%, 1)",
  },
  attr: "data-theme",
});

export const theme = GlobalTheme;


/*######################################(CREATE THEME)######################################*/

/**
 * This is your main theme configuration.
 * You can change these values to update how your app looks for light and dark mode.
 */
export const GlobalTheme = createTheme({
  root: {
    /*===================== Brand Color ======================*/
    // Update this value to use your brand's main color.
    "--brand": "hsla(274, 100%, 50%, 1)",

    /*=================== Light Mode Colors ====================*/
    // Tweak these values to match your light mode design.
    "--window": "hsla(0, 0%, 100%, 0.3)",
    "--surface": "hsla(0, 0%, 100%, 0.7)",
    "--background": "hsla(228, 52%, 96%, 1)",
    "--primary": "hsla(231, 42%, 15%, 1)",
    "--secondary": "hsla(224, 46%, 89%, 1)",
    "--muted": "hsla(228, 52%, 96%, 1)",
    "--invert": "hsla(0, 0%, 100%, 1)",
  },
  dark: {
    /*=================== Dark Mode Colors ====================*/
    // Adjust these values for your ideal dark mode palette.
    "--window": "hsla(229, 41%, 18%, 0.3)",
    "--surface": "hsla(229, 41%, 18%, 0.6)",
    "--background": "hsla(233, 44%, 12%, 1)",
    "--primary": "hsla(0, 0%, 100%, 1)",
    "--secondary": "hsla(232, 31%, 29%, 1)",
    "--muted": "hsla(233, 44%, 12%, 0.25)",
    "--invert": "hsla(231, 42%, 15%, 1)",
  },
  /*=================== Attribute Selector ====================*/
  // This determines how dark mode gets applied (e.g. data-theme attribute).
  attr: "data-theme",
});

export const theme = GlobalTheme;

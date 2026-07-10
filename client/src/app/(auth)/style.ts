export const AuthPageStyle = {
  root: createStyle({
    name: "auth-page-root",
    base: [{
      web: {
        position: "relative",
        isolation: "isolate",
        width: "100vw",
        height: "100dvh",
        minHeight: "720px",
        overflow: "hidden",
        color: "var(--primary)",
        background:
          "linear-gradient(135deg, var(--background) 0%, var(--muted) 48%, var(--surface) 100%)",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.28,
          backgroundImage:
            "linear-gradient(var(--brand) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "linear-gradient(115deg, transparent 0%, black 18%, black 76%, transparent 100%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: "auto -18% -42% 24%",
          zIndex: 0,
          height: "58%",
          pointerEvents: "none",
          background:
            "linear-gradient(100deg, transparent 0%, var(--brand) 38%, var(--accent) 62%, transparent 100%)",
          transform: "skewY(-10deg)",
          filter: "blur(18px)",
        },
        "@media (max-width: 920px)": {
          minHeight: "100dvh",
          overflowY: "auto",
        },
      },
    }],
  }),

  auth: createStyle({
    name: "auth-page-auth",
    base: [{
      web: {
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: "100%",
        minHeight: "inherit",
        color: "var(--primary)",
        background: "transparent",
        "& > *:first-child": {
          display: "flex",
          width: "100%",
          flex: "1 1 auto",
          minWidth: 0,
          height: "100%",
          minHeight: "inherit",
          padding: "22px",
          boxSizing: "border-box",
        },
        "& > *:nth-child(2)": {
          flex: "0 0 min(520px, 100%)",
          minWidth: "min(520px, 100%)",
          height: "100%",
          minHeight: "inherit",
        },
        "@media (max-width: 920px)": {
          display: "block",
          minHeight: "100dvh",
          "& > *:first-child": {
            display: "none",
          },
          "& > *:nth-child(2)": {
            minWidth: "100%",
          },
        },
      },
    }],
  }),

  media: createStyle({
    name: "auth-page-media",
    base: [{
      web: {
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        borderRadius: "8px",
        border: "1px solid var(--brand)",
        background: "var(--surface)",
        boxShadow:
          "inset 0 0 0 1px var(--primary), 0 28px 90px var(--background)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0",
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(90deg, transparent, var(--background))",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "32px",
          bottom: "30px",
          zIndex: 2,
          color: "var(--primary)",
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.16em",
        },
        "& img": {
          filter: "saturate(1.08) contrast(1.05)",
        },
      },
    }],
  }),

  wrapper: createStyle({
    name: "auth-page-wrapper",
    base: [{
      web: {
        padding: "32px",
        background: "transparent",
        "@media (max-width: 620px)": {
          padding: "18px",
        },
      },
    }],
  }),

  stack: createStyle({
    name: "auth-page-stack",
    base: [{
      web: {
        width: "min(100%, 410px)",
        maxWidth: "410px",
        height: "auto",
        minHeight: "auto",
        alignSelf: "center",
        padding: "32px",
        gap: "18px",
        borderRadius: "8px",
        color: "var(--primary)",
        textShadow: "0 1px 18px var(--brand)",
        border: "1px solid var(--brand)",
        background: "linear-gradient(180deg, var(--surface), var(--window))",
        boxShadow:
          "0 28px 80px var(--background), inset 0 1px 0 var(--primary)",
        backdropFilter: "blur(18px)",
        "& > *:first-child": {
          width: "96px",
          height: "96px",
          minWidth: "96px",
          minHeight: "96px",
          flex: "0 0 96px",
          alignSelf: "center",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: "0 18px 46px var(--brand), 0 0 0 1px var(--primary)",
        },
        "& input:not(.sr-only)": {
          color: "var(--primary)",
          background: "var(--surface)",
          borderColor: "var(--brand)",
          boxShadow: "inset 0 1px 0 var(--primary)",
        },
        "& input:not(.sr-only)::placeholder": {
          color: "var(--primary)",
        },
        "& button": {
          borderRadius: "8px",
        },
        "& button:disabled": {
          color: "var(--invert)",
          background: "linear-gradient(90deg, var(--brand), var(--accent))",
          boxShadow: "0 12px 34px var(--brand)",
          opacity: 0.88,
        },
        "@media (max-width: 620px)": {
          padding: "24px",
        },
      },
    }],
  }),

  title: createStyle({
    name: "auth-page-title",
    base: [{
      web: {
        color: "var(--primary)",
        fontSize: "22px",
        lineHeight: 1.15,
        fontWeight: 850,
        textAlign: "center",
      },
    }],
  }),
};

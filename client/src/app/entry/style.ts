import { createStyle } from "@in/style/variant";

/*################################(ENTRY STYLE)################################*/

export const EntryStyle = {
  root: createStyle({
    name: "tubefut-root",
    base: [{
      web: {
	        height: "100dvh",
	        minHeight: "100dvh",
	        width: "100%",
	        display: "block",
	        overflowX: "hidden",
	        overflowY: "scroll",
	        overscrollBehaviorY: "contain",
	        scrollbarGutter: "stable",
        background:
          "linear-gradient(135deg, #070707 0%, #17130b 36%, #071b16 66%, #17080d 100%)",
        color: "#fff7d7",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	        WebkitOverflowScrolling: "touch",
	        "& > div": {
	          height: "auto",
	          minHeight: "100%",
	          overflow: "visible",
	        },
	      },
	    }],
  }),

  shell: createStyle({
    name: "tubefut-shell",
    base: [{
      web: {
	        width: "min(1180px, calc(100vw - 32px))",
	        height: "auto",
	        minHeight: "100dvh",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 410px)",
        alignItems: "start",
        gap: "52px",
        padding: "34px 0 58px",
        boxSizing: "border-box",
        "@media (max-width: 920px)": {
          gridTemplateColumns: "1fr",
          alignItems: "start",
          gap: "30px",
          padding: "24px 0 44px",
        },
        "@media (max-width: 620px)": {
          width: "min(100% - 22px, 1180px)",
          padding: "18px 0 34px",
        },
      },
    }],
  }),

  content: createStyle({
    name: "tubefut-content",
    base: [{
      web: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        minWidth: 0,
        paddingTop: "12px",
        "@media (max-width: 920px)": {
          paddingTop: "0",
        },
      },
    }],
  }),

  eyebrow: createStyle({
    name: "tubefut-eyebrow",
    base: [{
      web: {
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        gap: "10px",
        padding: "8px 12px",
        border: "1px solid rgba(255, 215, 86, 0.36)",
        borderRadius: "999px",
        background: "rgba(255, 215, 86, 0.08)",
        color: "#ffe790",
        fontSize: "12px",
        fontWeight: 900,
        textTransform: "uppercase",
      },
    }],
  }),

  title: createStyle({
    name: "tubefut-title",
    base: [{
      web: {
        margin: 0,
        fontSize: "92px",
        lineHeight: 0.88,
        fontWeight: 950,
        letterSpacing: 0,
        color: "#fff7d7",
        textTransform: "uppercase",
        "@media (max-width: 920px)": {
          fontSize: "72px",
        },
        "@media (max-width: 620px)": {
          fontSize: "54px",
        },
      },
    }],
  }),

  copy: createStyle({
    name: "tubefut-copy",
    base: [{
      web: {
        maxWidth: "650px",
        color: "rgba(255, 247, 215, 0.76)",
        fontSize: "18px",
        lineHeight: 1.55,
        margin: 0,
        "@media (max-width: 620px)": {
          fontSize: "16px",
        },
      },
    }],
  }),

	  search: {
	    root: createStyle({
      name: "tubefut-search-root",
      base: [{
        web: {
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "12px",
          maxWidth: "680px",
          alignItems: "stretch",
          "@media (max-width: 620px)": {
            gridTemplateColumns: "1fr",
          },
	        },
	      }],
	    }),
	    frame: createStyle({
	      name: "tubefut-search-frame",
	      base: [{
	        web: {
	          minHeight: "58px",
	          width: "100%",
	          display: "flex",
	          alignItems: "center",
	          padding: "0 18px",
	          boxSizing: "border-box",
	          borderRadius: "16px",
	          border: "1px solid rgba(255, 255, 255, 0.18)",
	          background: "rgba(255, 255, 255, 0.08)",
	          boxShadow: "0 18px 50px rgba(0, 0, 0, 0.22)",
	        },
	      }],
	    }),
	    input: createStyle({
	      name: "tubefut-search-input",
	      base: [{
	        web: {
	          minHeight: "100%",
	          width: "100%",
	          height: "100%",
	          padding: "0",
	          boxSizing: "border-box",
	          borderRadius: "0",
	          border: "0",
	          background: "transparent",
	          color: "#fff7d7",
	          outline: "0",
	          fontSize: "16px",
	          fontWeight: 800,
	          boxShadow: "none",
	          "&::placeholder": {
	            color: "rgba(255, 247, 215, 0.46)",
	          },
	        },
	      }],
	    }),
    button: createStyle({
      name: "tubefut-search-button",
      base: [{
        web: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          minHeight: "58px",
          padding: "0 24px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #ff284f, #ffd756)",
          color: "#110b03",
          border: "0",
          cursor: "pointer",
          fontWeight: 950,
          boxShadow: "0 18px 42px rgba(255, 40, 79, 0.28)",
        },
      }],
    }),
  },

  examples: createStyle({
    name: "tubefut-examples",
    base: [{
      web: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      },
    }],
  }),

  pill: createStyle({
    name: "tubefut-pill",
    base: [{
      web: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "38px",
        padding: "0 14px",
        borderRadius: "999px",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        color: "#fff7d7",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 850,
      },
    }],
  }),

  error: createStyle({
    name: "tubefut-error",
    base: [{
      web: {
        maxWidth: "680px",
        padding: "12px 14px",
        borderRadius: "12px",
        color: "#ffd0d6",
        background: "rgba(255, 40, 79, 0.12)",
        border: "1px solid rgba(255, 40, 79, 0.28)",
        fontSize: "14px",
        fontWeight: 800,
      },
    }],
  }),

  metrics: createStyle({
    name: "tubefut-metrics",
    base: [{
      web: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "12px",
        maxWidth: "680px",
        "@media (max-width: 620px)": {
          gridTemplateColumns: "1fr",
        },
      },
    }],
  }),

  metric: createStyle({
    name: "tubefut-metric",
    base: [{
      web: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "14px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        background: "rgba(255, 255, 255, 0.06)",
        borderRadius: "8px",
        minHeight: "76px",
      },
    }],
  }),

  metricValue: createStyle({
    name: "tubefut-metric-value",
    base: [{
      web: {
        color: "#ffd756",
        fontSize: "24px",
        lineHeight: 1,
        fontWeight: 950,
      },
    }],
  }),

  metricLabel: createStyle({
    name: "tubefut-metric-label",
    base: [{
      web: {
        color: "rgba(255, 247, 215, 0.68)",
        fontSize: "12px",
        fontWeight: 800,
        textTransform: "uppercase",
      },
    }],
  }),

  card: {
    wrap: createStyle({
      name: "tubefut-card-wrap",
      base: [{
        web: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          minWidth: 0,
          position: "sticky",
          top: "24px",
          "@media (max-width: 920px)": {
            position: "relative",
            top: "auto",
          },
        },
      }],
    }),
    root: createStyle({
      name: "tubefut-card-root",
      base: [{
        web: {
          position: "relative",
          width: "min(370px, calc(100vw - 30px))",
          aspectRatio: "5 / 7.04",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
	          padding: "10px",
	          boxSizing: "border-box",
	          overflow: "hidden",
	          borderRadius: "34px 34px 118px 118px / 30px 30px 82px 82px",
	          border: "1px solid rgba(255, 244, 190, 0.34)",
	          background:
	            "linear-gradient(145deg, #fff0a8 0%, #e7b647 30%, #a96c1d 62%, #3c2308 100%)",
          boxShadow:
            "0 34px 80px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(255, 244, 190, 0.28)",
          color: "#160f05",
          "@media (max-width: 420px)": {
            width: "min(340px, calc(100vw - 24px))",
          },
        },
      }],
      settings: {
        rank: {
          Bronze: [{
            web: {
              background: "linear-gradient(145deg, #e1a36a, #7d3f1f)",
            },
          }],
          Silver: [{
            web: {
              background: "linear-gradient(145deg, #fffdf5, #b4bbc2, #575e67)",
            },
          }],
          Gold: [{
            web: {
              background:
                "linear-gradient(145deg, #f9df87, #d9a441 43%, #7a4b17)",
            },
          }],
          Hero: [{
            web: {
              background:
                "linear-gradient(145deg, #b3ffe9, #16a8a6 46%, #10282e)",
            },
          }],
          Icon: [{
            web: {
              background:
                "linear-gradient(145deg, #fff8ca, #f0bf44 42%, #ff284f 115%)",
            },
          }],
        },
      },
      defaultSettings: {
        rank: "Gold",
      },
    }),
    inner: createStyle({
      name: "tubefut-card-inner",
      base: [{
        web: {
	          position: "relative",
	          width: "100%",
	          height: "100%",
	          borderRadius: "28px 28px 96px 96px / 26px 26px 70px 70px",
	          background:
	            "linear-gradient(160deg, rgba(255, 231, 144, 0.18) 0%, rgba(255, 231, 144, 0.03) 30%, transparent 31%), linear-gradient(180deg, #191107 0%, #080807 56%, #020202 100%)",
          color: "#fff7d7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "21px 24px 23px",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }],
    }),
    sheen: createStyle({
      name: "tubefut-card-sheen",
      base: [{
        web: {
          position: "absolute",
          inset: "0",
          pointerEvents: "none",
          background:
            "linear-gradient(118deg, rgba(255, 255, 255, 0.24) 0%, transparent 22%, transparent 58%, rgba(255, 40, 79, 0.16) 100%)",
          opacity: 0.62,
        },
      }],
    }),
    linework: createStyle({
      name: "tubefut-card-linework",
      base: [{
        web: {
	          position: "absolute",
	          inset: "26px 30px auto",
	          height: "46%",
	          pointerEvents: "none",
	          borderRadius: "24px",
	          borderTop: "1px solid rgba(255, 231, 144, 0.26)",
	          borderBottom: "1px solid rgba(255, 231, 144, 0.12)",
	          opacity: 0.72,
	        },
	      }],
    }),
    top: createStyle({
      name: "tubefut-card-top",
      base: [{
        web: {
          position: "relative",
          zIndex: 1,
          width: "76%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "12px",
        },
      }],
    }),
    overall: createStyle({
      name: "tubefut-card-overall",
      base: [{ web: { display: "flex", flexDirection: "column", gap: "2px" } }],
    }),
    overallNumber: createStyle({
      name: "tubefut-card-overall-number",
      base: [{
        web: {
          fontSize: "46px",
          lineHeight: 0.88,
          color: "#ffe790",
          fontWeight: 950,
          textShadow: "0 2px 12px rgba(255, 215, 86, 0.18)",
        },
      }],
    }),
    position: createStyle({
      name: "tubefut-card-position",
      base: [{
        web: {
          fontSize: "18px",
          lineHeight: 1,
          color: "#fff7d7",
          fontWeight: 950,
          letterSpacing: 0,
        },
      }],
    }),
    rank: createStyle({
      name: "tubefut-card-rank",
      base: [{
        web: {
          borderRadius: "999px",
          padding: "6px 10px",
          background: "linear-gradient(135deg, #ff284f, #ffd756)",
          color: "#fff7d7",
          fontSize: "10px",
          fontWeight: 950,
          boxShadow: "0 10px 28px rgba(255, 40, 79, 0.28)",
        },
      }],
    }),
    cardTag: createStyle({
      name: "tubefut-card-tag",
      base: [{
        web: {
          marginTop: "8px",
          color: "rgba(255, 247, 215, 0.64)",
          fontSize: "9px",
          lineHeight: 1,
          fontWeight: 900,
          textAlign: "right",
          textTransform: "uppercase",
        },
      }],
    }),
    avatarFrame: createStyle({
      name: "tubefut-card-avatar-frame",
      base: [{
        web: {
          position: "relative",
          zIndex: 1,
          width: "128px",
          height: "128px",
          flex: "0 0 auto",
          marginTop: "7px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, #231506, #050505 58%, #0a211c)",
          border: "4px solid rgba(255, 231, 144, 0.92)",
          boxShadow:
            "0 18px 44px rgba(0, 0, 0, 0.42), inset 0 0 0 1px rgba(255, 255, 255, 0.14)",
        },
      }],
    }),
    avatarInitials: createStyle({
      name: "tubefut-card-avatar-initials",
      base: [{
        web: {
          color: "#ffe790",
          fontSize: "38px",
          lineHeight: 1,
          fontWeight: 950,
          textShadow: "0 8px 22px rgba(0, 0, 0, 0.44)",
        },
      }],
    }),
    avatar: createStyle({
      name: "tubefut-card-avatar",
      base: [{
        web: {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: "50%",
          objectFit: "cover",
          background: "transparent",
        },
      }],
    }),
    name: createStyle({
      name: "tubefut-card-name",
      base: [{
        web: {
          marginTop: "12px",
          position: "relative",
          zIndex: 1,
          width: "100%",
          color: "#fff7d7",
          fontSize: "25px",
          lineHeight: 1,
          fontWeight: 950,
          textAlign: "center",
          textTransform: "uppercase",
          overflowWrap: "anywhere",
        },
      }],
    }),
    handle: createStyle({
      name: "tubefut-card-handle",
      base: [{
        web: {
          marginTop: "6px",
          position: "relative",
          zIndex: 1,
          color: "rgba(255, 247, 215, 0.72)",
          width: "82%",
          fontSize: "11px",
          lineHeight: 1.15,
          fontWeight: 800,
          textAlign: "center",
        },
      }],
    }),
    stats: createStyle({
      name: "tubefut-card-stats",
      base: [{
        web: {
          width: "76%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "7px 12px",
          marginTop: "14px",
          position: "relative",
          zIndex: 1,
        },
      }],
    }),
    stat: createStyle({
      name: "tubefut-card-stat",
      base: [{
        web: {
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          minWidth: 0,
          padding: "6px 7px",
          borderRadius: "8px",
          background: "rgba(255, 247, 215, 0.055)",
          border: "1px solid rgba(255, 231, 144, 0.10)",
        },
      }],
    }),
    statLine: createStyle({
      name: "tubefut-card-stat-line",
      base: [{
        web: {
          display: "flex",
          alignItems: "baseline",
          gap: "6px",
          minWidth: 0,
        },
      }],
    }),
    statValue: createStyle({
      name: "tubefut-card-stat-value",
      base: [{
        web: {
          color: "#ffe790",
          fontSize: "23px",
          fontWeight: 950,
          lineHeight: 1,
        },
      }],
    }),
    statKey: createStyle({
      name: "tubefut-card-stat-key",
      base: [{
        web: {
          color: "#fff7d7",
          fontSize: "13px",
          fontWeight: 950,
          lineHeight: 1,
        },
      }],
    }),
    statDetail: createStyle({
      name: "tubefut-card-stat-detail",
      base: [{
        web: {
          color: "rgba(255, 247, 215, 0.58)",
          fontSize: "8px",
          lineHeight: 1.1,
          fontWeight: 850,
          textTransform: "uppercase",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }],
    }),
    footer: createStyle({
      name: "tubefut-card-footer",
      base: [{
        web: {
          marginTop: "auto",
          position: "relative",
          zIndex: 1,
          width: "76%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          color: "rgba(255, 247, 215, 0.82)",
          fontSize: "11px",
          fontWeight: 900,
          textTransform: "uppercase",
        },
      }],
    }),
  },

  actions: createStyle({
    name: "tubefut-actions",
    base: [{
      web: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "10px",
        width: "min(370px, calc(100vw - 30px))",
        "@media (max-width: 420px)": {
          width: "min(340px, calc(100vw - 24px))",
        },
      },
    }],
  }),

  actionButton: createStyle({
    name: "tubefut-action-button",
    base: [{
      web: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "44px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        color: "#fff7d7",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 900,
      },
    }],
  }),
};

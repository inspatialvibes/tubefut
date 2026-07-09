/*################################(AUTH WINDOW)################################*/

/*************************** (Const) ***************************/
// Controlling the Auth Title based on the Auth Flow i.e current auth view
const label = $(() => {
  switch (useAuth.flow.get()) {
    case "signin":
      return "Let's get you signed in";
    case "signup":
      return "Let's get you signed up";
    case "forgotPassword":
      return "Let's help you reset your password";
    default:
      return;
  }
});

<Auth
  axis={{
    direction: "x",
    reverse: true,
  }}
  // mode="all-in"
  format="alto"
  children={{
    wrapper: {
      background: "background",

      stack: {
        brand: {
          variant: "AtIcon",
          background: "muted",
          color: "secondary",
          radius: "full",
        },

        title: {
          label: $(() => label.get()),
          style: {
            fontSize: "16px",
          },
          motion: "fade-d",
        },

        kind: {
          format: "Tab",
          children: {
            radius: "8",
          },
        },

        form: {},
        forgotPassword: {
          Badge: {
            children: "Forgot password?",
          },
        },
      },
    },
  }}
/>

/*################################(AUTH WINDOW)################################*/

import { AuthPageStyle } from "./style.ts";

/*************************** (Const) ***************************/
// Controlling the Auth Title based on the Auth Flow i.e current auth view
const label = $(() => {
  switch (useAuth.flow.get()) {
    case "signin":
      return "Welcome back to TubeFut";
    case "signup":
      return "Create your TubeFut account";
    case "forgotPassword":
      return "Reset your TubeFut password";
    default:
      return;
  }
});

<Slot className={AuthPageStyle.root.getStyle()}>
  <Auth
    className={AuthPageStyle.auth.getStyle()}
    axis={{
      direction: "x",
      reverse: false,
    }}
    mode="all-in"
    children={{
      media: {
        display: false,
      },
      wrapper: {
        className: AuthPageStyle.wrapper.getStyle(),
        background: "transparent",
        stack: {
          className: AuthPageStyle.stack.getStyle(),
          order: ["brand", "title", "kind", "form", "forgotPassword"],
          brand: {
            variant: "AtIcon",
            background: "brand",
            color: "invert",
            radius: "8",
            size: "84",
            padding: "14",
          },

          title: {
            label: $(() => label.get()),
            className: AuthPageStyle.title.getStyle(),
            motion: "fade-d",
          },

          kind: {
            format: "Tab",
            children: {
              radius: "8",
            },
          },

          // oAuth: { providers: ["google"] },
          divider: {},
          form: {
            emailField: {
              placeholder: "Email address",
            },
            passwordField: {
              placeholder: "Password",
            },
            passwordConfirmField: {
              placeholder: "Confirm password",
            },
            submit: {
              color: "brand",
              radius: "8",
            },
          },
          forgotPassword: {
            Badge: {
              children: "Forgot password?",
              radius: "8",
            },
          },
        },
      },
    }}
  />
</Slot>;

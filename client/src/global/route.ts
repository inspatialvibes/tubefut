
/*################################(GLOBAL ROUTE)################################*/
export const GlobalRoute = createRoute({
  authGating: {
    signInPath: "/",
    afterSignInPath: "/entry",
    getAuthStatus: () => useAuth.status.peek(),
    onAuthChange: (cb) => useAuth.status.subscribe(cb),
  },
  defaultView: "error",
});

export const route = GlobalRoute;

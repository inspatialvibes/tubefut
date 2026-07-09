import { Error } from "@inspatial/kit/control-flow";

/*################################(GLOBAL ERROR)################################*/
const route = createRoute();
if (!route) return;

<Fragment name="GlobalError">
  <Error
    error={route.error}
    on:home={() => route.to("/")}
    on:back={() => route.back()}
    on:reload={() => route.reload()}
  />
</Fragment>

<Fragment name="Error">
  <GlobalError />
</Fragment>

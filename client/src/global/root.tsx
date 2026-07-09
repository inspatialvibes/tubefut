/*################################(GLOBAL ROOT)################################*/
<Fragment name="GlobalRoot">
  <Dynamic chain={GlobalRoute.chain} otherwise={Loader} />
  <InCloudStatus />
  <NTA />
</Fragment>

<Fragment name="Root">
  <GlobalRoot />
</Fragment>

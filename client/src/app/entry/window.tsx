/*################################(ENTRY WINDOW)################################*/
<Fragment>
  <ErrorBoundary>
    <KitBorder />
    <View className={EntryStyle.root.getStyle()}>
      <Slot className={EntryStyle.text.getStyle()}>
        Hello, <Strong>{useAuth.user.get()?.firstName}</Strong>!
      </Slot>
      <Button>Click me</Button>
    </View>
  </ErrorBoundary>
</Fragment>;

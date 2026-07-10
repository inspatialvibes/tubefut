/*################################(ENTRY WINDOW)################################*/

const useTubefut = createTubefutState();
const activeCard = $(() => useTubefut.card.get() ?? DEMO_CARD);
const activeStats = $(() => getCardStats(activeCard.get()));
const activeInitials = $(() => getInitials(activeCard.get().title));

function submitLookup() {
  void useTubefut.handleLookup();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Enter") submitLookup();
}

function hideBrokenAvatar(event: Event) {
  const image = event.currentTarget as HTMLElement | null;
  if (image) image.style.display = "none";
}

function showLoadedAvatar(event: Event) {
  const image = event.currentTarget as HTMLElement | null;
  if (image) image.style.display = "block";
}

useTubefut.syncUrlChannel();
globalThis.setTimeout?.(useTubefut.syncUrlChannel, 400);

<Fragment>
  <ErrorBoundary>
	    <Slot className={EntryStyle.root.getStyle()}>
	      <Slot className={EntryStyle.shell.getStyle()}>
        <YStack className={EntryStyle.content.getStyle()}>
          <Text className={EntryStyle.eyebrow.getStyle()}>
            YOUTUBE X ULTIMATE TEAM
          </Text>
          <Text className={EntryStyle.title.getStyle()}>TUBEFUT</Text>
          <Text className={EntryStyle.copy.getStyle()}>
            Scout any public YouTube channel and turn its Data API stats into a
            99-rated creator card built for shares, group chats, and timeline
            arguments.
          </Text>

	          <XStack className={EntryStyle.search.root.getStyle()}>
	            <View className={EntryStyle.search.frame.getStyle()}>
	              <Input variant="TextInput" type="text"
	                id="channel-query"
	                name="channel-query"
	                className={EntryStyle.search.input.getStyle()}
	                placeholder="@handle, channel URL, or UC channel ID"
	                value={$(() => useTubefut.query.get()) as any}
	                on:input={useTubefut.handleInput}
	                on:keydown={handleKeydown} />
	            </View>
            <Button type="button"
              aria-label="Scout channel"
              className={EntryStyle.search.button.getStyle()}
              disabled={$(() => useTubefut.loading.get()) as any}
              on:tap={submitLookup}
            >
              {$(() => useTubefut.loading.get() ? "Scouting" : "Scout")}
            </Button>
          </XStack>

          <XStack className={EntryStyle.examples.getStyle()}>
            <Button type="button"
              aria-label="Scout MrBeast"
              className={EntryStyle.pill.getStyle()}
              on:tap={() => useTubefut.handleExample(TUBEFUT_EXAMPLES[0])}
            >
              @MrBeast
            </Button>
            <Button type="button"
              aria-label="Scout MKBHD"
              className={EntryStyle.pill.getStyle()}
              on:tap={() => useTubefut.handleExample(TUBEFUT_EXAMPLES[1])}
            >
              @mkbhd
            </Button>
            <Button type="button"
              aria-label="Scout Veritasium"
              className={EntryStyle.pill.getStyle()}
              on:tap={() => useTubefut.handleExample(TUBEFUT_EXAMPLES[2])}
            >
              @veritasium
            </Button>
            <Button type="button"
              aria-label="Show demo card"
              className={EntryStyle.pill.getStyle()}
              on:tap={useTubefut.handleDemo}>
              Demo card
            </Button>
          </XStack>

          <Show when={useTubefut.error.isNotEmpty()}>
            <Text className={EntryStyle.error.getStyle()}>
              {useTubefut.error}
            </Text>
          </Show>

          <XStack className={EntryStyle.metrics.getStyle()}>
            <View className={EntryStyle.metric.getStyle()}>
              <Text className={EntryStyle.metricValue.getStyle()}>
                {$(() =>
                  formatCompactNumber(activeCard.get().totals.subscriberCount)
                )}
              </Text>
              <Text className={EntryStyle.metricLabel.getStyle()}>
                Subscribers
              </Text>
            </View>
            <View className={EntryStyle.metric.getStyle()}>
              <Text className={EntryStyle.metricValue.getStyle()}>
                {$(() => formatCompactNumber(activeCard.get().totals.viewCount))}
              </Text>
              <Text className={EntryStyle.metricLabel.getStyle()}>
                Total views
              </Text>
            </View>
            <View className={EntryStyle.metric.getStyle()}>
              <Text className={EntryStyle.metricValue.getStyle()}>
                {$(() => formatPercent(activeCard.get().totals.engagementRate))}
              </Text>
              <Text className={EntryStyle.metricLabel.getStyle()}>
                Recent engagement
              </Text>
            </View>
          </XStack>
        </YStack>

        <YStack className={EntryStyle.card.wrap.getStyle()}>
          <View
            className={$(() =>
              EntryStyle.card.root.getStyle({ rank: activeCard.get().rank })
            )}
          >
            <YStack className={EntryStyle.card.inner.getStyle()}>
              <View className={EntryStyle.card.sheen.getStyle()} />
              <View className={EntryStyle.card.linework.getStyle()} />

              <XStack className={EntryStyle.card.top.getStyle()}>
                <YStack className={EntryStyle.card.overall.getStyle()}>
                  <Text className={EntryStyle.card.overallNumber.getStyle()}>
                    {$(() => String(activeCard.get().overall))}
                  </Text>
                  <Text className={EntryStyle.card.position.getStyle()}>
                    {$(() => activeCard.get().position)}
                  </Text>
                </YStack>
                <YStack>
                  <Text className={EntryStyle.card.rank.getStyle()}>
                    {$(() => activeCard.get().rank.toUpperCase())}
                  </Text>
                  <Text className={EntryStyle.card.cardTag.getStyle()}>
                    Creator card
                  </Text>
                </YStack>
              </XStack>

              <View className={EntryStyle.card.avatarFrame.getStyle()}>
                <Text className={EntryStyle.card.avatarInitials.getStyle()}>
                  {activeInitials}
                </Text>
	                <Image
	                  className={EntryStyle.card.avatar.getStyle()}
	                  src={$(() => activeCard.get().avatarUrl) as any}
	                  alt=""
	                  loading="eager"
	                  decoding="async"
	                  on:load={showLoadedAvatar}
	                  on:error={hideBrokenAvatar}
                />
              </View>

              <Text className={EntryStyle.card.name.getStyle()}>
                {$(() => activeCard.get().title)}
              </Text>
              <Text className={EntryStyle.card.handle.getStyle()}>
                {$(() =>
                  `${getHandleLabel(activeCard.get())} / ${
                    activeCard.get().archetype
                  }`
                )}
              </Text>

              <XStack className={EntryStyle.card.stats.getStyle()}>
                <List each={activeStats}>
                  {(stat: TubefutMetric) => (
                    <YStack className={EntryStyle.card.stat.getStyle()}>
                      <XStack className={EntryStyle.card.statLine.getStyle()}>
                        <Text className={EntryStyle.card.statValue.getStyle()}>
                          {stat.value}
                        </Text>
                        <Text className={EntryStyle.card.statKey.getStyle()}>
                          {stat.key}
                        </Text>
                      </XStack>
                      <Text className={EntryStyle.card.statDetail.getStyle()}>
                        {stat.label}
                      </Text>
                    </YStack>
                  )}
                </List>
              </XStack>

              <XStack className={EntryStyle.card.footer.getStyle()}>
                <Text>{$(() => activeCard.get().countryCode || "WORLD")}</Text>
                <Text>TUBEFUT.COM</Text>
                <Text>
                  {$(() => `SINCE ${formatYear(activeCard.get().publishedAt)}`)}
                </Text>
              </XStack>
            </YStack>
          </View>

          <XStack className={EntryStyle.actions.getStyle()}>
            <Button type="button"
              className={EntryStyle.actionButton.getStyle()}
              on:tap={useTubefut.handleShare}>
              Share
            </Button>
            <Button type="button"
              className={EntryStyle.actionButton.getStyle()}
              on:tap={useTubefut.handleCopy}>
              Copy link
            </Button>
            <Button type="button"
              className={EntryStyle.actionButton.getStyle()}
              on:tap={useTubefut.handleDownload}>
              PNG
            </Button>
          </XStack>
        </YStack>
	      </Slot>
	    </Slot>
  </ErrorBoundary>
</Fragment>;

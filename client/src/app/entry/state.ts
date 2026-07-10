import { incloud } from "@in/cloud";
import { batch } from "@in/teract/signal";
import { createState } from "@in/teract/state";
import {
  copyShareLink,
  DEMO_CARD,
  downloadCard,
  shareCard,
} from "./helpers.ts";
import type { TubefutCard, TubefutState } from "./type.ts";

/*################################(CREATE TUBEFUT STATE)################################*/

export function createTubefutState() {
  const initialQuery = getInitialChannelQuery();
  let syncedUrlChannel = "";
  const useTubefut = createState<TubefutState>({
    query: initialQuery,
    card: DEMO_CARD,
    loading: false,
    error: "",
    copied: false,
    history: [],
  });

  batch(() => {
    useTubefut.query.set(initialQuery);
    useTubefut.card.set(DEMO_CARD);
    useTubefut.loading.set(false);
    useTubefut.error.set("");
    useTubefut.copied.set(false);
    useTubefut.history.set([]);
  });

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    useTubefut.query.set(target?.value ?? "");
  }

  function syncUrlChannel() {
    const channelQuery = getInitialChannelQuery();
    if (!channelQuery) return;

    const expected = normalizeChannelLabel(channelQuery);
    const card = getActiveCard();
    const currentQuery = normalizeChannelLabel(useTubefut.query.peek());
    const currentCard = normalizeChannelLabel(card.handle || card.customUrl);
    if (
      syncedUrlChannel === channelQuery &&
      (currentQuery === expected || currentCard === expected)
    ) {
      return;
    }

    syncedUrlChannel = channelQuery;
    batch(() => {
      useTubefut.query.set(channelQuery);
      useTubefut.error.set("");
      useTubefut.copied.set(false);
    });
    queueMicrotask(() => {
      void handleLookup(channelQuery);
    });
  }

  async function handleLookup(nextQuery = useTubefut.query.peek()) {
    const query = nextQuery.trim();
    if (!query) {
      useTubefut.error.set(
        "Enter a YouTube handle, channel URL, or channel ID.",
      );
      return;
    }

    batch(() => {
      useTubefut.loading.set(true);
      useTubefut.error.set("");
      useTubefut.copied.set(false);
    });

    try {
      const card = await incloud.api.call<TubefutCard>(
        "tubefut",
        "rateChannel",
        { query },
      );
      batch(() => {
        useTubefut.card.set(card);
        useTubefut.query.set(card.handle || query);
        useTubefut.history.set([
          card,
          ...useTubefut.history.peek().filter((item) =>
            item.channelId !== card.channelId
          ),
        ].slice(0, 4));
      });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Could not scout that channel yet.";
      useTubefut.error.set(
        message.includes("API Error - 500")
          ? "Live scouting needs YOUTUBE_API_KEY in server/.env."
          : message,
      );
    } finally {
      useTubefut.loading.set(false);
    }
  }

  function handleExample(query: string) {
    useTubefut.query.set(query);
    void handleLookup(query);
  }

  function handleDemo() {
    batch(() => {
      useTubefut.card.set(DEMO_CARD);
      useTubefut.query.set(DEMO_CARD.handle);
      useTubefut.error.set("");
      useTubefut.copied.set(false);
    });
  }

  async function handleCopy() {
    await runShareAction(() => copyShareLink(getActiveCard()));
  }

  async function handleDownload() {
    await runShareAction(async () => {
      await downloadCard(getActiveCard());
      return "Downloaded card";
    });
  }

  async function handleShare() {
    await runShareAction(() => shareCard(getActiveCard()));
  }

  async function runShareAction(action: () => Promise<string>) {
    try {
      const message = await action();
      batch(() => {
        useTubefut.error.set("");
        useTubefut.copied.set(message.includes("Copied"));
      });
    } catch (error) {
      batch(() => {
        useTubefut.copied.set(false);
        useTubefut.error.set(
          error instanceof Error ? error.message : "Share action failed.",
        );
      });
    }
	}

	  function getActiveCard() {
	    return useTubefut.card.peek() ?? DEMO_CARD;
	  }

  syncUrlChannel();
  globalThis.setTimeout?.(syncUrlChannel, 250);
  globalThis.addEventListener?.("pageshow", syncUrlChannel);

	  return {
    ...useTubefut,
    syncUrlChannel,
    handleInput,
    handleLookup,
    handleExample,
    handleDemo,
    handleCopy,
    handleDownload,
    handleShare,
	  };
	}

function getInitialChannelQuery(): string {
  const search = globalThis.location?.search ?? "";
  const channel = new URLSearchParams(search).get("channel")?.trim() ?? "";
  if (!channel) return "";
  if (channel.startsWith("@") || channel.startsWith("UC")) return channel;
  return `@${channel}`;
}

function normalizeChannelLabel(value: string): string {
  return value.trim().replace(/^@/, "").toLowerCase();
}

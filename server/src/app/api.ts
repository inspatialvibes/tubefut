import { defineAPIGroup } from "@inspatial/cloud";

/*################################(TYPES)################################*/

type TubefutStatKey = "PAC" | "SHO" | "PAS" | "DRI" | "DEF" | "PHY";
type TubefutRank = "Bronze" | "Silver" | "Gold" | "Hero" | "Icon";
type TubefutStats = Record<TubefutStatKey, number>;

type YouTubeListResponse<T> = {
  items?: T[];
  error?: {
    message?: string;
  };
};

type YouTubeChannel = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    customUrl?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string }>;
    country?: string;
  };
  statistics?: {
    viewCount?: string;
    subscriberCount?: string;
    hiddenSubscriberCount?: boolean;
    videoCount?: string;
  };
  brandingSettings?: {
    channel?: {
      country?: string;
    };
    image?: {
      bannerExternalUrl?: string;
    };
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

type YouTubeSearchResult = {
  id?: {
    channelId?: string;
  };
};

type YouTubePlaylistItem = {
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: {
      videoId?: string;
    };
  };
};

type YouTubeVideo = {
  id: string;
  snippet?: {
    title?: string;
    publishedAt?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
};

type TubefutRecentVideo = {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

/*################################(DEFINE API)################################*/

export const tubefutAPI = defineAPIGroup("tubefut", {
  label: "Tubefut API",
  description: "API actions for YouTube creator card scoring",
});

/*################################(PING)################################*/

tubefutAPI.addAction("ping", {
  label: "Ping",
  description: "Health check action",
  action: () => ({ ok: true }),
  params: [],
});

/*################################(RATE CHANNEL)################################*/

tubefutAPI.addAction("rateChannel", {
  label: "Rate Channel",
  description: "Build a TubeFut creator card from public YouTube Data API stats",
  authRequired: false,
  params: [
    {
      key: "query",
      label: "Channel query",
      type: "TextField",
      required: true,
      description:
        "YouTube handle, channel URL, channel ID, or channel search term",
    },
  ],
  action: async ({ params }) => {
    const query = String(params.query ?? "").trim();
    if (!query) {
      throw new Error("Enter a YouTube handle, channel URL, or channel ID.");
    }

    const apiKey = getYouTubeApiKey();
    const channel = await resolveChannel(query, apiKey);
    const recent = await getRecentVideos(channel, apiKey);
    return createTubefutCard(channel, recent);
  },
});

/*################################(YOUTUBE CLIENT)################################*/

function getYouTubeApiKey(): string {
  const value = Deno.env.get("YOUTUBE_API_KEY") ||
    Deno.env.get("TUBEFUT_YOUTUBE_API_KEY");
	  if (!value) {
	    throw new Error(
	      "The Tubefut server did not load YOUTUBE_API_KEY. Add it to server/.env, then restart deno task dev.",
	    );
	  }
  return value;
}

async function youtubeGet<T>(
  path: string,
  apiKey: string,
  params: Record<string, string>,
) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);
  const body = await response.json() as YouTubeListResponse<T>;
  if (!response.ok) {
    throw new Error(
      body.error?.message || `YouTube API request failed with ${response.status}.`,
    );
  }
  return body;
}

async function resolveChannel(
  query: string,
  apiKey: string,
): Promise<YouTubeChannel> {
  const target = parseChannelQuery(query);
  let channel: YouTubeChannel | undefined;

  if (target.kind === "id") {
    channel = await getChannel(apiKey, { id: target.value });
  }
  if (target.kind === "handle") {
    channel = await getChannel(apiKey, { forHandle: target.value });
  }
  if (target.kind === "username") {
    channel = await getChannel(apiKey, { forUsername: target.value });
  }

  if (!channel) {
    const search = await youtubeGet<YouTubeSearchResult>("search", apiKey, {
      part: "snippet",
      type: "channel",
      maxResults: "1",
      q: target.value,
    });
    const channelId = search.items?.[0]?.id?.channelId;
    if (channelId) channel = await getChannel(apiKey, { id: channelId });
  }

  if (!channel) {
    throw new Error(`No public YouTube channel found for "${query}".`);
  }
  return channel;
}

async function getChannel(apiKey: string, filter: Record<string, string>) {
  const response = await youtubeGet<YouTubeChannel>("channels", apiKey, {
    part: "snippet,statistics,brandingSettings,contentDetails",
    maxResults: "1",
    ...filter,
  });
  return response.items?.[0];
}

async function getRecentVideos(
  channel: YouTubeChannel,
  apiKey: string,
): Promise<TubefutRecentVideo[]> {
  const uploads = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) return [];

  const playlist = await youtubeGet<YouTubePlaylistItem>(
    "playlistItems",
    apiKey,
    {
      part: "snippet,contentDetails",
      maxResults: "12",
      playlistId: uploads,
    },
  );
  const ids = (playlist.items ?? [])
    .map((item) => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId)
    .filter((id): id is string => Boolean(id));

  if (!ids.length) return [];

  const videos = await youtubeGet<YouTubeVideo>("videos", apiKey, {
    part: "snippet,statistics",
    id: ids.join(","),
  });

  return (videos.items ?? []).map((video) => ({
    id: video.id,
    title: video.snippet?.title ?? "Untitled video",
    publishedAt: video.snippet?.publishedAt ?? "",
    viewCount: toNumber(video.statistics?.viewCount),
    likeCount: toNumber(video.statistics?.likeCount),
    commentCount: toNumber(video.statistics?.commentCount),
  }));
}

/*################################(SCORING)################################*/

function createTubefutCard(
  channel: YouTubeChannel,
  recent: TubefutRecentVideo[],
) {
  const title = channel.snippet?.title ?? "YouTube Channel";
  const customUrl = channel.snippet?.customUrl ?? "";
  const handle = normalizeHandle(customUrl);
  const subscriberCount = toNumber(channel.statistics?.subscriberCount);
  const hiddenSubscriberCount = Boolean(
    channel.statistics?.hiddenSubscriberCount,
  );
  const viewCount = toNumber(channel.statistics?.viewCount);
  const videoCount = toNumber(channel.statistics?.videoCount);
  const averageRecentViews = average(recent.map((video) => video.viewCount));
  const averageRecentLikes = average(recent.map((video) => video.likeCount));
  const averageRecentComments = average(
    recent.map((video) => video.commentCount),
  );
  const engagementRate = averageRecentViews > 0
    ? (averageRecentLikes + averageRecentComments) / averageRecentViews
    : 0;
  const uploadVelocity = getUploadVelocity(recent);
  const stats = createStats({
    subscriberCount,
    hiddenSubscriberCount,
    viewCount,
    videoCount,
    averageRecentViews,
    averageRecentLikes,
    averageRecentComments,
    engagementRate,
    uploadVelocity,
    publishedAt: channel.snippet?.publishedAt ?? "",
    recent,
  });
  const overall = clampScore(
    stats.SHO * 0.24 +
      stats.PHY * 0.22 +
      stats.PAS * 0.18 +
      stats.PAC * 0.14 +
      stats.DRI * 0.12 +
      stats.DEF * 0.10,
  );

  return {
    channelId: channel.id,
    title,
    handle,
    customUrl,
    description: channel.snippet?.description ?? "",
    channelUrl: handle
      ? `https://www.youtube.com/${handle}`
      : `https://www.youtube.com/channel/${channel.id}`,
    avatarUrl: getBestThumbnail(channel),
    bannerUrl: channel.brandingSettings?.image?.bannerExternalUrl ?? "",
    countryCode: channel.brandingSettings?.channel?.country ||
      channel.snippet?.country || "",
    publishedAt: channel.snippet?.publishedAt ?? "",
    position: choosePosition(stats),
    archetype: chooseArchetype(stats),
    rank: chooseRank(overall),
    overall,
    stats,
    totals: {
      subscriberCount,
      hiddenSubscriberCount,
      viewCount,
      videoCount,
      averageRecentViews,
      averageRecentLikes,
      averageRecentComments,
      uploadVelocity,
      engagementRate,
    },
    recent,
    meta: {
      dataSource:
        "YouTube Data API v3: channels.list, playlistItems.list, videos.list",
      scoredAt: new Date().toISOString(),
      notes: [
        "Scores use public channel statistics and the latest public uploads returned by the YouTube Data API.",
        hiddenSubscriberCount
          ? "Subscriber count is hidden, so reach and recent video performance carry more weight."
          : "Subscriber count is public and included in the score.",
      ],
    },
  };
}

function createStats(input: {
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  viewCount: number;
  videoCount: number;
  averageRecentViews: number;
  averageRecentLikes: number;
  averageRecentComments: number;
  engagementRate: number;
  uploadVelocity: number;
  publishedAt: string;
  recent: TubefutRecentVideo[];
}): TubefutStats {
  const channelAgeYears = getAgeYears(input.publishedAt);
  const viewsPerVideo = input.videoCount > 0
    ? input.viewCount / input.videoCount
    : 0;
  const consistency = getConsistencyScore(
    input.recent.map((video) => video.viewCount),
  );

  return {
    PAC: scaleLinear(input.uploadVelocity, 0.25, 8),
    SHO: clampScore(
      logScore(Math.max(input.averageRecentViews, viewsPerVideo), 8.4),
    ),
    PAS: clampScore(
      scaleLinear(input.engagementRate, 0.004, 0.085) * 0.82 +
        logScore(input.averageRecentComments, 5.4) * 0.18,
    ),
    DRI: clampScore(
      consistency * 0.62 + scaleLinear(input.videoCount, 20, 900) * 0.38,
    ),
    DEF: clampScore(
      scaleLinear(channelAgeYears, 1, 12) * 0.54 +
        scaleLinear(input.videoCount, 30, 1400) * 0.28 +
        scaleLinear(input.viewCount, 1000000, 2000000000) * 0.18,
    ),
    PHY: clampScore(
      (input.hiddenSubscriberCount
        ? logScore(input.viewCount, 11)
        : logScore(input.subscriberCount, 8.8)) * 0.72 +
        logScore(input.viewCount, 11) * 0.28,
    ),
  };
}

function chooseRank(overall: number): TubefutRank {
  if (overall >= 95) return "Icon";
  if (overall >= 90) return "Hero";
  if (overall >= 82) return "Gold";
  if (overall >= 72) return "Silver";
  return "Bronze";
}

function choosePosition(stats: TubefutStats): string {
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]) as Array<
    [TubefutStatKey, number]
  >;
  switch (entries[0]?.[0]) {
    case "PAC":
      return "RW";
    case "SHO":
      return "ST";
    case "PAS":
      return "CAM";
    case "DRI":
      return "LW";
    case "DEF":
      return "CDM";
    case "PHY":
      return "CB";
    default:
      return "CM";
  }
}

function chooseArchetype(stats: TubefutStats): string {
  const top = choosePosition(stats);
  if (top === "ST") return "Algorithm Striker";
  if (top === "CAM") return "Commentary Playmaker";
  if (top === "RW") return "Upload Sprinter";
  if (top === "LW") return "Consistency Winger";
  if (top === "CDM") return "Niche Anchor";
  return "Legacy Tank";
}

/*################################(HELPERS)################################*/

function parseChannelQuery(input: string) {
  const value = input.trim();
  const channelMatch = value.match(/youtube\.com\/channel\/(UC[\w-]+)/i);
  if (channelMatch) return { kind: "id", value: channelMatch[1] };

  const handleMatch = value.match(/youtube\.com\/@([\w.-]+)/i);
  if (handleMatch) return { kind: "handle", value: `@${handleMatch[1]}` };

  const userMatch = value.match(/youtube\.com\/user\/([\w.-]+)/i);
  if (userMatch) return { kind: "username", value: userMatch[1] };

  if (/^UC[\w-]{20,}$/i.test(value)) return { kind: "id", value };
  if (value.startsWith("@")) return { kind: "handle", value };

  return { kind: "search", value };
}

function normalizeHandle(value: string): string {
  if (!value) return "";
  return value.startsWith("@") ? value : `@${value.replace(/^\/+/, "")}`;
}

function getBestThumbnail(channel: YouTubeChannel): string {
  const thumbnails = channel.snippet?.thumbnails ?? {};
  return thumbnails.high?.url || thumbnails.medium?.url ||
    thumbnails.default?.url || "";
}

function getUploadVelocity(recent: TubefutRecentVideo[]): number {
  if (recent.length < 2) return recent.length;
  const times = recent.map((video) => new Date(video.publishedAt).getTime())
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  if (times.length < 2) return recent.length;
  const spanDays = Math.max(1, (times.at(-1)! - times[0]) / 86400000);
  return recent.length / Math.max(spanDays / 30, 1);
}

function getConsistencyScore(values: number[]): number {
  const filtered = values.filter((value) => value > 0);
  if (filtered.length < 3) return 62;
  const mean = average(filtered);
  const variance = average(filtered.map((value) => (value - mean) ** 2));
  const cv = Math.sqrt(variance) / Math.max(mean, 1);
  return clampScore(99 - cv * 34);
}

function getAgeYears(value: string): number {
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return 0;
  return Math.max(0, (Date.now() - time) / 31557600000);
}

function average(values: number[]): number {
  const filtered = values.filter((value) => Number.isFinite(value));
  if (!filtered.length) return 0;
  return filtered.reduce((sum, value) => sum + value, 0) / filtered.length;
}

function toNumber(value: string | number | undefined): number {
  const next = Number(value ?? 0);
  return Number.isFinite(next) ? next : 0;
}

function scaleLinear(value: number, min: number, max: number): number {
  const normalized = (value - min) / Math.max(max - min, 1);
  return clampScore(40 + normalized * 59);
}

function logScore(value: number, maxLog: number): number {
  return clampScore(35 + (Math.log10(Math.max(0, value) + 1) / maxLog) * 64);
}

function clampScore(value: number): number {
  return Math.max(35, Math.min(99, Math.round(value)));
}

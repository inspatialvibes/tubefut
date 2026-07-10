import type { TubefutCard, TubefutMetric, TubefutStatKey } from "./type.ts";

/*################################(CONSTANTS)################################*/

export const TUBEFUT_EXAMPLES = ["@MrBeast", "@mkbhd", "@veritasium"] as const;

const STAT_LABELS: Record<TubefutStatKey, string> = {
  PAC: "Momentum",
  SHO: "Reach",
  PAS: "Engage",
  DRI: "Consistency",
  DEF: "Authority",
  PHY: "Legacy",
};

export const DEMO_CARD: TubefutCard = {
  channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
  title: "MrBeast",
  handle: "@MrBeast",
  customUrl: "@MrBeast",
  description: "Demo card shown until the YouTube API key is connected.",
  channelUrl: "https://www.youtube.com/@MrBeast",
  avatarUrl:
    "https://yt3.googleusercontent.com/ytc/AIdro_kA5Eo2fCJh2e9RZ9w7_kKc38vU1nZPdp4gmW3Qaw=s240-c-k-c0x00ffffff-no-rj",
  bannerUrl: "",
  countryCode: "US",
  publishedAt: "2012-02-20T00:00:00Z",
  position: "ST",
  archetype: "Algorithm Striker",
  rank: "Icon",
  overall: 99,
  stats: {
    PAC: 97,
    SHO: 99,
    PAS: 96,
    DRI: 93,
    DEF: 84,
    PHY: 99,
  },
  totals: {
    subscriberCount: 380000000,
    hiddenSubscriberCount: false,
    viewCount: 80000000000,
    videoCount: 850,
    averageRecentViews: 110000000,
    averageRecentLikes: 3200000,
    averageRecentComments: 98000,
    uploadVelocity: 5.2,
    engagementRate: 0.03,
  },
  recent: [],
  meta: {
    dataSource: "Demo card",
    scoredAt: new Date().toISOString(),
    notes: ["Connect YOUTUBE_API_KEY on the server to score live channels."],
  },
};

/*################################(FORMATTERS)################################*/

export function formatCompactNumber(value: number): string {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: value >= 1000000 ? 1 : 0,
  });
  return formatter.format(Math.max(0, Number(value) || 0));
}

export function formatPercent(value: number): string {
  return `${(Math.max(0, value) * 100).toFixed(value >= 0.1 ? 0 : 1)}%`;
}

export function formatYear(value: string): string {
  const year = new Date(value).getFullYear();
  return Number.isFinite(year) ? String(year) : "----";
}

export function getHandleLabel(card: TubefutCard): string {
  if (card.handle) {
    return card.handle.startsWith("@") ? card.handle : `@${card.handle}`;
  }
  if (card.customUrl) {
    return card.customUrl.startsWith("@")
      ? card.customUrl
      : `@${card.customUrl}`;
  }
  return card.channelId;
}

export function getInitials(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (!parts.length) return "YT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function getCardStats(card: TubefutCard): TubefutMetric[] {
  return (Object.keys(STAT_LABELS) as TubefutStatKey[]).map((key) => ({
    key,
    label: STAT_LABELS[key],
    value: card.stats[key],
    detail: getStatDetail(key, card),
  }));
}

function getStatDetail(key: TubefutStatKey, card: TubefutCard): string {
  switch (key) {
    case "PAC":
      return `${card.totals.uploadVelocity.toFixed(1)} uploads/mo`;
    case "SHO":
      return `${formatCompactNumber(card.totals.averageRecentViews)} avg views`;
    case "PAS":
      return `${formatPercent(card.totals.engagementRate)} engagement`;
    case "DRI":
      return `${formatCompactNumber(card.totals.videoCount)} videos`;
    case "DEF":
      return `Since ${formatYear(card.publishedAt)}`;
    case "PHY":
      return card.totals.hiddenSubscriberCount
        ? "Subscribers hidden"
        : `${formatCompactNumber(card.totals.subscriberCount)} subs`;
  }
}

/*################################(SHARE HELPERS)################################*/

export function getShareUrl(card: TubefutCard): string {
  const channel = encodeURIComponent(getShareChannelParam(card));
  const origin = getShareOrigin();
  const path = globalThis.location?.pathname || "/entry";
  return `${origin}${path}?channel=${channel}`;
}

export function getShareText(card: TubefutCard): string {
  return `${card.title} is a ${card.overall}-rated ${card.position} on TubeFut.`;
}

export async function copyShareLink(card: TubefutCard): Promise<string> {
  await navigator.clipboard?.writeText(getShareUrl(card));
  return "Copied link";
}

export async function downloadCard(card: TubefutCard): Promise<void> {
  const blob = await createCardPngBlob(card);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${sanitizeFileName(card.title)}-tubefut-card.png`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function shareCard(card: TubefutCard): Promise<string> {
  const blob = await createCardPngBlob(card);
  const file = new File(
    [blob],
    `${sanitizeFileName(card.title)}-tubefut-card.png`,
    { type: "image/png" },
  );
	  const sharePayload = {
	    title: "TubeFut Card",
	    text: getShareText(card),
	    url: getShareUrl(card),
	    files: [file],
	  };
	  const shareApi = navigator as Navigator & {
	    canShare?: (payload: { files?: File[] }) => boolean;
	    share?: (
	      payload: { title?: string; text?: string; url?: string; files?: File[] },
	    ) => Promise<void>;
	  };

  if (
    shareApi.share &&
    (!shareApi.canShare || shareApi.canShare({ files: [file] }))
  ) {
    await shareApi.share(sharePayload);
    return "Share sheet opened";
  }

	  await copyShareLink(card);
	  return "Copied link";
}

function getShareOrigin(): string {
  const origin = globalThis.location?.origin;
  if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) {
    return "https://tubefut.com";
  }
  return origin;
}

function getShareChannelParam(card: TubefutCard): string {
  const label = getHandleLabel(card);
  if (label.startsWith("@")) return label.slice(1);
  return label;
}

/*################################(EXPORT CARD)################################*/

function createCardSvg(card: TubefutCard): string {
  const stats = getCardStats(card);
  const initials = getInitials(card.title);
  const title = escapeSvg(card.title.toUpperCase()).slice(0, 24);
  const handle = escapeSvg(getHandleLabel(card));
  const rank = escapeSvg(card.rank.toUpperCase());
  const position = escapeSvg(card.position);
  const archetype = escapeSvg(card.archetype);
  const subs = card.totals.hiddenSubscriberCount
    ? "HIDDEN SUBS"
    : `${formatCompactNumber(card.totals.subscriberCount)} SUBS`;

  const statRows = stats.map((stat, index) => {
    const x = index % 2 === 0 ? 142 : 490;
    const y = 833 + Math.floor(index / 2) * 92;
    return `<text x="${x}" y="${y}" class="statValue">${stat.value}</text><text x="${
      x + 82
    }" y="${y}" class="statKey">${stat.key}</text>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1260" viewBox="0 0 900 1260">
  <defs>
    <linearGradient id="plate" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f9df87"/>
      <stop offset="0.42" stop-color="#d9a441"/>
      <stop offset="1" stop-color="#7a4b17"/>
    </linearGradient>
    <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#15120b"/>
      <stop offset="1" stop-color="#050505"/>
    </linearGradient>
    <radialGradient id="flare" cx="50%" cy="20%" r="70%">
      <stop offset="0" stop-color="#fff5c2" stop-opacity="0.78"/>
      <stop offset="1" stop-color="#ff264d" stop-opacity="0"/>
    </radialGradient>
    <style>
      .overall { font: 900 138px Inter, Arial, sans-serif; fill: #171005; }
      .position { font: 900 54px Inter, Arial, sans-serif; fill: #171005; }
      .name { font: 900 64px Inter, Arial, sans-serif; fill: #fff7d7; letter-spacing: 0; }
      .meta { font: 800 27px Inter, Arial, sans-serif; fill: #2b1a08; }
      .statValue { font: 900 58px Inter, Arial, sans-serif; fill: #fff4c8; }
      .statKey { font: 900 42px Inter, Arial, sans-serif; fill: #ffd756; }
      .small { font: 800 28px Inter, Arial, sans-serif; fill: #f8e8a6; }
      .tiny { font: 800 22px Inter, Arial, sans-serif; fill: #fff7d7; opacity: 0.86; }
    </style>
  </defs>
  <rect width="900" height="1260" fill="#0b0b0b"/>
  <path d="M450 35 C622 60 766 147 807 329 C849 516 805 903 450 1218 C95 903 51 516 93 329 C134 147 278 60 450 35Z" fill="url(#plate)"/>
  <path d="M450 86 C590 108 711 184 746 342 C780 493 735 851 450 1125 C165 851 120 493 154 342 C189 184 310 108 450 86Z" fill="url(#deep)"/>
  <path d="M450 86 C590 108 711 184 746 342 C780 493 735 851 450 1125 C165 851 120 493 154 342 C189 184 310 108 450 86Z" fill="url(#flare)"/>
  <path d="M179 333 L721 333 L675 727 L225 727Z" fill="#f8d46b" opacity="0.16"/>
  <circle cx="450" cy="490" r="164" fill="#fff2b6" opacity="0.18"/>
  <circle cx="450" cy="490" r="128" fill="#111" stroke="#f7d568" stroke-width="10"/>
  <text x="450" y="523" text-anchor="middle" class="overall" fill="#f7d568" style="fill:#f7d568">${initials}</text>
  <text x="159" y="254" class="overall">${card.overall}</text>
  <text x="172" y="318" class="position">${position}</text>
  <rect x="560" y="177" width="168" height="58" rx="29" fill="#ff2a4f"/>
  <text x="644" y="215" text-anchor="middle" class="meta">${rank}</text>
  <text x="450" y="765" text-anchor="middle" class="name">${title}</text>
  <text x="450" y="805" text-anchor="middle" class="tiny">${handle} / ${archetype}</text>
  ${statRows}
  <line x1="450" y1="792" x2="450" y2="1037" stroke="#f9df87" stroke-width="3" opacity="0.32"/>
  <text x="450" y="1107" text-anchor="middle" class="small">${escapeSvg(subs)} / ${
    formatCompactNumber(card.totals.viewCount)
  } VIEWS</text>
  <text x="450" y="1150" text-anchor="middle" class="tiny">TUBEFUT.COM</text>
</svg>`;
}

async function createCardPngBlob(card: TubefutCard): Promise<Blob> {
  const svg = createCardSvg(card);
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  try {
    const image = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 1260;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas export is not available in this browser.");
    }
    context.drawImage(image, 0, 0);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not export TubeFut card."));
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Could not render TubeFut card image."));
    image.src = src;
  });
}

function sanitizeFileName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(
    /(^-|-$)/g,
    "",
  ) || "channel";
}

function escapeSvg(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
    />/g,
    "&gt;",
  ).replace(/"/g, "&quot;");
}

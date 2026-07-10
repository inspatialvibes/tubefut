/*################################(TUBEFUT TYPES)################################*/

export type TubefutStatKey = "PAC" | "SHO" | "PAS" | "DRI" | "DEF" | "PHY";

export type TubefutRank = "Bronze" | "Silver" | "Gold" | "Hero" | "Icon";

export type TubefutStats = Record<TubefutStatKey, number>;

export type TubefutRecentVideo = {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

export type TubefutTotals = {
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  viewCount: number;
  videoCount: number;
  averageRecentViews: number;
  averageRecentLikes: number;
  averageRecentComments: number;
  uploadVelocity: number;
  engagementRate: number;
};

export type TubefutCard = {
  channelId: string;
  title: string;
  handle: string;
  customUrl: string;
  description: string;
  channelUrl: string;
  avatarUrl: string;
  bannerUrl: string;
  countryCode: string;
  publishedAt: string;
  position: string;
  archetype: string;
  rank: TubefutRank;
  overall: number;
  stats: TubefutStats;
  totals: TubefutTotals;
  recent: TubefutRecentVideo[];
  meta: {
    dataSource: string;
    scoredAt: string;
    notes: string[];
  };
};

export type TubefutMetric = {
  key: TubefutStatKey;
  label: string;
  value: number;
  detail: string;
};

export type TubefutState = {
  query: string;
  card: TubefutCard | null;
  loading: boolean;
  error: string;
  copied: boolean;
  history: TubefutCard[];
};

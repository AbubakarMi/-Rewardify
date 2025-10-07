export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  avatarUrl: string;
  points: number;
};

export type Reward = {
  id: string;
  userId: string;
  type: 'points' | 'badge' | 'gift-card';
  value: number | string;
  description: string;
  date: string;
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string;
  points: number;
};

export type GiftCard = {
  id: string;
  name: string;
  value: number;
  pointsCost: number;
  imageUrl: string;
  imageHint: string;
};

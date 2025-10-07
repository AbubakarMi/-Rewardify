import type { User, Reward, LeaderboardEntry, GiftCard } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'employee', avatarUrl: findImage('user1')?.imageUrl ?? '', points: 1250 },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'employee', avatarUrl: findImage('user2')?.imageUrl ?? '', points: 1100 },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'employee', avatarUrl: findImage('user3')?.imageUrl ?? '', points: 950 },
  { id: '4', name: 'Diana Miller', email: 'diana@example.com', role: 'employee', avatarUrl: findImage('user4')?.imageUrl ?? '', points: 1300 },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'admin', avatarUrl: findImage('admin1')?.imageUrl ?? '', points: 0 },
  { id: '6', name: 'Frank White', email: 'frank@example.com', role: 'employee', avatarUrl: findImage('user5')?.imageUrl ?? '', points: 800 },
];

export const currentUser: User = users[4];
export const currentEmployee: User = users[0];

export const rewards: Reward[] = [
  { id: 'r1', userId: '1', type: 'badge', value: 'Team Player', description: 'For exceptional collaboration on the Q2 project.', date: '2023-06-15T10:00:00Z' },
  { id: 'r2', userId: '1', type: 'points', value: 100, description: 'Outstanding presentation to stakeholders.', date: '2023-06-20T14:30:00Z' },
  { id: 'r3', userId: '2', type: 'points', value: 150, description: 'Going above and beyond to help a new hire.', date: '2023-07-01T11:00:00Z' },
  { id: 'r4', userId: '4', type: 'gift-card', value: '$25 Amazon Gift Card', description: 'Winner of the monthly innovation challenge.', date: '2023-07-05T09:00:00Z' },
  { id: 'r5', userId: '3', type: 'points', value: 50, description: 'Perfect attendance for Q2.', date: '2023-07-02T16:00:00Z' },
  { id: 'r6', userId: '1', type: 'points', value: 200, description: 'Lead generation record.', date: '2023-07-10T09:00:00Z' },
];

export const leaderboard: LeaderboardEntry[] = users
  .filter(u => u.role === 'employee')
  .sort((a, b) => b.points - a.points)
  .map((user, index) => ({
    rank: index + 1,
    userId: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    points: user.points,
  }));

export const giftCards: GiftCard[] = [
  { id: 'gc1', name: 'Amazon Gift Card', value: 10, pointsCost: 1000, imageUrl: findImage('amazon')?.imageUrl ?? '', imageHint: findImage('amazon')?.imageHint ?? '' },
  { id: 'gc2', name: 'Starbucks Gift Card', value: 5, pointsCost: 500, imageUrl: findImage('starbucks')?.imageUrl ?? '', imageHint: findImage('starbucks')?.imageHint ?? '' },
  { id: 'gc3', name: 'Apple Gift Card', value: 25, pointsCost: 2500, imageUrl: findImage('apple')?.imageUrl ?? '', imageHint: findImage('apple')?.imageHint ?? '' },
  { id: 'gc4', name: 'Local Coffee Shop', value: 10, pointsCost: 900, imageUrl: findImage('coffee')?.imageUrl ?? '', imageHint: findImage('coffee')?.imageHint ?? '' },
];

import { App, Bookmark, Model } from '.';

export interface NewCategory {
  name: string;
  type: string;
  isPublic: boolean;
}

export interface Category extends Model, NewCategory {
  isPinned: boolean;
  orderId: number;
  apps: App[];
  bookmarks: Bookmark[];
}

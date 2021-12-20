import { Model } from '.';

export interface NewApp {
  name: string;
  url: string;
  categoryId: number;
  icon: string;
  isPublic: boolean;
  description: string;
}

export interface App extends Model, NewApp {
  orderId: number;
  isPinned: boolean;
}

import { Category, NewCategory } from '../../interfaces';

export const newBookmarkCategoryTemplate: NewCategory = {
  name: '',
  type: 'bookmarks',
  isPublic: true,
};

export const bookmarkCategoryTemplate: Category = {
  ...newBookmarkCategoryTemplate,
  id: -1,
  isPinned: false,
  orderId: 0,
  apps: [],
  bookmarks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const newAppCategoryTemplate: NewCategory = {
  name: '',
  type: 'apps',
  isPublic: true,
};

export const appCategoryTemplate: Category = {
  ...newBookmarkCategoryTemplate,
  id: -1,
  isPinned: false,
  orderId: 0,
  apps: [],
  bookmarks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
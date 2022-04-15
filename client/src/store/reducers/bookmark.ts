import { Bookmark } from '../../interfaces';
import { sortData } from '../../utility';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { categoriesReducer, CategoriesState } from './category';

interface BookmarksState extends CategoriesState {
  bookmarkInEdit: Bookmark | null;
}

const initialState: BookmarksState = {
  loading: true,
  errors: undefined,
  categories: [],
  type: 'bookmarks',
  categoryInEdit: null,
  bookmarkInEdit: null,
};

export const bookmarksReducer = (
  state: BookmarksState = initialState,
  action: Action
): BookmarksState => {
  switch (action.type) {
    
    case ActionType.addBookmark: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const targetCategory = {
        ...state.categories[categoryIdx],
        bookmarks: [...state.categories[categoryIdx].bookmarks, action.payload],
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          targetCategory,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };
    }

    case ActionType.deleteBookmark: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const targetCategory = {
        ...state.categories[categoryIdx],
        bookmarks: state.categories[categoryIdx].bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload.bookmarkId
        ),
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          targetCategory,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };
    }

    case ActionType.updateBookmark: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const bookmarkIdx = state.categories[categoryIdx].bookmarks.findIndex(
        (bookmark) => bookmark.id === action.payload.id
      );

      const targetCategory = {
        ...state.categories[categoryIdx],
        bookmarks: [
          ...state.categories[categoryIdx].bookmarks.slice(0, bookmarkIdx),
          action.payload,
          ...state.categories[categoryIdx].bookmarks.slice(bookmarkIdx + 1),
        ],
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          targetCategory,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };
    }

    case ActionType.setEditBookmark: {
      return {
        ...state,
        bookmarkInEdit: action.payload,
      };
    }

    case ActionType.reorderBookmarks: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          {
            ...state.categories[categoryIdx],
            bookmarks: action.payload.bookmarks,
          },
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    case ActionType.sortBookmarks: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const sortedBookmarks = sortData<Bookmark>(
        state.categories[categoryIdx].bookmarks,
        action.payload.orderType
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          {
            ...state.categories[categoryIdx],
            bookmarks: sortedBookmarks,
          },
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    default:
      return categoriesReducer(state, action);
  }
};

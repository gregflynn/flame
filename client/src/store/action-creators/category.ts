import axios from 'axios';
import { Dispatch } from 'redux';

import { ApiResponse, Category, Config, NewCategory } from '../../interfaces';
import { applyAuth } from '../../utility';
import { ActionType } from '../action-types';
import {
  AddCategoryAction,
  DeleteCategoryAction,
  GetCategoriesAction,
  PinCategoryAction,
  ReorderCategoriesAction,
  SetEditCategoryAction,
  SortCategoriesAction,
  UpdateCategoryAction,
} from '../actions/category';

export const getCategories =
  () =>
  async (dispatch: Dispatch<GetCategoriesAction<undefined | Category[]>>) => {
    dispatch({
      type: ActionType.getCategories,
      payload: undefined,
    });

    try {
      const res = await axios.get<ApiResponse<Category[]>>('/api/categories', {
        headers: applyAuth(),
      });

      dispatch({
        type: ActionType.getCategoriesSuccess,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addCategory =
  (formData: NewCategory) => async (dispatch: Dispatch<AddCategoryAction>) => {
    try {
      const res = await axios.post<ApiResponse<Category>>(
        '/api/categories',
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${formData.name} created`,
        },
      });

      dispatch({
        type: ActionType.addCategory,
        payload: res.data.data,
      });

      dispatch<any>(sortCategories());
    } catch (err) {
      console.log(err);
    }
  };


export const pinCategory =
  (category: Category) => async (dispatch: Dispatch<PinCategoryAction>) => {
    try {
      const { id, isPinned, name } = category;
      const res = await axios.put<ApiResponse<Category>>(
        `/api/categories/${id}`,
        { isPinned: !isPinned },
        { headers: applyAuth() }
      );

      const status = isPinned
        ? 'unpinned from Homescreen'
        : 'pinned to Homescreen';

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${name} ${status}`,
        },
      });

      dispatch({
        type: ActionType.pinCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteCategory =
  (id: number) => async (dispatch: Dispatch<DeleteCategoryAction>) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/categories/${id}`, {
        headers: applyAuth(),
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category deleted`,
        },
      });

      dispatch({
        type: ActionType.deleteCategory,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateCategory =
  (id: number, formData: NewCategory) =>
  async (dispatch: Dispatch<UpdateCategoryAction>) => {
    try {
      const res = await axios.put<ApiResponse<Category>>(
        `/api/categories/${id}`,
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${formData.name} updated`,
        },
      });

      dispatch({
        type: ActionType.updateCategory,
        payload: res.data.data,
      });

      dispatch<any>(sortCategories());
    } catch (err) {
      console.log(err);
    }
  };

export const sortCategories =
  () => async (dispatch: Dispatch<SortCategoriesAction>) => {
    try {
      const res = await axios.get<ApiResponse<Config>>('/api/config');

      dispatch({
        type: ActionType.sortCategories,
        payload: res.data.data.useOrdering,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const reorderCategories =
  (categories: Category[]) =>
  async (dispatch: Dispatch<ReorderCategoriesAction>) => {
    interface ReorderQuery {
      categories: {
        id: number;
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = { categories: [] };

      categories.forEach((category, index) =>
        updateQuery.categories.push({
          id: category.id,
          orderId: index + 1,
        })
      );

      await axios.put<ApiResponse<{}>>(
        '/api/categories/0/reorder',
        updateQuery,
        { headers: applyAuth() }
      );

      dispatch({
        type: ActionType.reorderCategories,
        payload: categories,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const setEditCategory =
  (category: Category | null) =>
  (dispatch: Dispatch<SetEditCategoryAction>) => {
    dispatch({
      type: ActionType.setEditCategory,
      payload: category,
    });
  };

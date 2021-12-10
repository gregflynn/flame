import { App } from '../../interfaces';
import { ActionType } from '../action-types';



export interface AddAppAction {
  type: ActionType.addApp;
  payload: App;
}

export interface PinAppAction {
  type: ActionType.pinApp;
  payload: App;
}
export interface DeleteAppAction {
  type: ActionType.deleteApp;
  payload: {
    appId: number;
    categoryId: number;
  };
}

export interface UpdateAppAction {
  type: ActionType.updateApp;
  payload: App;
}


export interface SetEditAppAction {
  type: ActionType.setEditApp;
  payload: App | null;
}

export interface ReorderAppsAction {
  type: ActionType.reorderApps;
  payload: {
    apps: App[];
    categoryId: number;
  };
}

export interface SortAppsAction {
  type: ActionType.sortApps;
  payload: {
    orderType: string;
    categoryId: number;
  };
}

import { WeatherData } from '../types';

export interface Config {
  WEATHER_API_KEY: string;
  lat: number;
  long: number;
  isCelsius: boolean;
  customTitle: string;
  pinAppsByDefault: boolean;
  pinBookmarksByDefault: boolean;
  pinCategoriesByDefault: boolean;
  hideHeader: boolean;
  useOrdering: string;
  appsSameTab: boolean;
  bookmarksSameTab: boolean;
  searchSameTab: boolean;
  hideApps: boolean;
  hideBookmarks: boolean;
  hideEmptyCategories: boolean;
  hideSearch: boolean;
  defaultSearchProvider: string;
  secondarySearchProvider: string;
  dockerApps: boolean;
  dockerHost: string;
  kubernetesApps: boolean;
  unpinStoppedApps: boolean;
  hideGreeting: boolean;
  disableAutofocus: boolean;
  greetingsSchema: string;
  daySchema: string;
  monthSchema: string;
  showTime: boolean;
  defaultTheme: string;
  isKilometer: boolean;
  weatherData: WeatherData;
  hideDate: boolean;
}

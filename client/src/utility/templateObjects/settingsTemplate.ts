import { DockerSettingsForm, GeneralForm, ThemeSettingsForm, UISettingsForm, WeatherForm } from '../../interfaces';

export const uiSettingsTemplate: UISettingsForm = {
  customTitle: document.title,
  hideHeader: false,
  hideApps: false,
  hideBookmarks: false,
  hideEmptyCategories: true,
  hideGreeting: false,
  greetingsSchema: 'Good evening!;Good afternoon!;Good morning!;Good night!',
  daySchema: 'Sun;Mon;Tue;Wed;Thu;Fri;Sat',
  monthSchema: 'Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec',
  showTime: false,
  hideDate: false,
  hideSearch: false,
  disableAutofocus: false,
};

export const weatherSettingsTemplate: WeatherForm = {
  WEATHER_API_KEY: '',
  lat: 0,
  long: 0,
  isCelsius: true,
  weatherData: 'cloud',
};

export const generalSettingsTemplate: GeneralForm = {
  searchSameTab: false,
  defaultSearchProvider: 'l',
  secondarySearchProvider: 'd',
  pinAppsByDefault: true,
  pinBookmarksByDefault: true,
  pinCategoriesByDefault: true,
  useOrdering: 'createdAt',
  appsSameTab: false,
  bookmarksSameTab: false,
};

export const dockerSettingsTemplate: DockerSettingsForm = {
  dockerApps: true,
  dockerHost: 'localhost',
  kubernetesApps: true,
  unpinStoppedApps: true,
};

export const themeSettingsTemplate: ThemeSettingsForm = {
  defaultTheme: 'tron',
};

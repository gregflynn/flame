import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Category } from '../../interfaces';
import { actionCreators } from '../../store';
import { State } from '../../store/reducers';
import { escapeRegex } from '../../utility';
import { AppGrid } from '../Apps/AppGrid/AppGrid';
import { BookmarkGrid } from '../Bookmarks/BookmarkGrid/BookmarkGrid';
import { Icon, Message, SectionHeadline, Spinner } from '../UI';
import { Container } from '../UI/Layout/Layout';
import { Header } from './Header/Header';
import classes from './Home.module.css';

export const Home = (): JSX.Element => {
  const {
    apps: { categories: appCategories, loading: appsLoading },
    bookmarks: { categories: bookmarkCategories, loading: bookmarksLoading },
    config: { config },
    auth: { isAuthenticated },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { getCategories } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // Local search query
  const [localSearch, setLocalSearch] = useState<null | string>(null);
  const [appSearchResult, setAppSearchResult] = useState<null | Category[]>(null);
  const [bookmarkSearchResult, setBookmarkSearchResult] = useState<
    null | Category[]
  >(null);

  // Load apps and bookmarks
  useEffect(() => {
    if (!appCategories.length && !bookmarkCategories.length) {
      getCategories();
    }
  }, []);

  useEffect(() => {
    if (localSearch) {
      // Search through apps
      setAppSearchResult([
        ...appCategories.filter(({ name }) =>
          new RegExp(escapeRegex(localSearch), 'i').test(name)
        ),
      ]);

      // Search through apps
      const appCategory = { ...appCategories[0] };

      appCategory.name = 'Search Results';
      appCategory.apps = appCategories
        .map(({ apps }) => apps)
        .flat()
        .filter(({ name, url, description }) =>
          new RegExp(escapeRegex(localSearch), 'i').test(`${name} ${url} ${description}`)
        );

        setAppSearchResult([appCategory]);

      // Search through bookmarks
      const bookmarkCategory = { ...bookmarkCategories[0] };

      bookmarkCategory.name = 'Search Results';
      bookmarkCategory.bookmarks = bookmarkCategories
        .map(({ bookmarks }) => bookmarks)
        .flat()
        .filter(({ name, url }) =>
          new RegExp(escapeRegex(localSearch), 'i').test(`${name} ${url}`)
        );

      setBookmarkSearchResult([bookmarkCategory]);
    } else {
      setAppSearchResult(null);
      setBookmarkSearchResult(null);
    }
  }, [localSearch]);

  return (
    <Container>
      {!config.hideHeader && (
        <Header bookmarkSearchResult={bookmarkSearchResult} appSearchResult={appSearchResult} setLocalSearch={setLocalSearch} />
      )}

      {!isAuthenticated &&
      !appCategories.some((a) => a.isPinned) &&
      !bookmarkCategories.some((c) => c.isPinned) ? (
        <Message>
          Welcome to Flame! Go to <Link to="/settings/app">/settings</Link>,
          login and start customizing your new homepage
        </Message>
      ) : (
        <></>
      )}

      {!config.hideApps && (isAuthenticated || appCategories.some((a) => a.isPinned)) ? (
        <Fragment>
          <SectionHeadline title="Applications" link="/applications" />
          {appsLoading ? (
            <Spinner />
          ) : (
            <AppGrid
              categories={
                !appSearchResult
                  ? appCategories.filter(({ isPinned }) => isPinned)
                  : appSearchResult
              }
              totalCategories={appCategories.length}
              searching={!!localSearch}
              fromHomepage={true}
            />
          )}
          <div className={classes.HomeSpace}></div>
        </Fragment>
      ) : (
        <></>
      )}

      {!config.hideBookmarks && (isAuthenticated || bookmarkCategories.some((c) => c.isPinned)) ? (
        <Fragment>
          <SectionHeadline title="Bookmarks" link="/bookmarks" />
          {bookmarksLoading ? (
            <Spinner />
          ) : (
            <BookmarkGrid
              categories={
                !bookmarkSearchResult
                  ? bookmarkCategories.filter(({ isPinned }) => isPinned)
                  : bookmarkSearchResult
              }
              totalCategories={bookmarkCategories.length}
              searching={!!localSearch}
              fromHomepage={true}
            />
          )}
        </Fragment>
      ) : (
        <></>
      )}

      <Link to="/settings" className={classes.SettingsButton}>
        <Icon icon="mdiCog" color="var(--color-background)" />
      </Link>
    </Container>
  );
};

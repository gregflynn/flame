import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Category } from '../../../interfaces';
import { State } from '../../../store/reducers';
import { Message } from '../../UI';
import { BookmarkCard } from '../BookmarkCard/BookmarkCard';
import classes from './BookmarkGrid.module.css';

interface Props {
  categories: Category[];
  totalCategories?: number;
  searching: boolean;
  fromHomepage?: boolean;
}

export const BookmarkGrid = (props: Props): JSX.Element => {
  const {
    categories,
    totalCategories,
    searching,
    fromHomepage = false,
  } = props;

  const {
    config: { config }
  } = useSelector((state: State) => state);

  let bookmarks: JSX.Element;

  if (categories.length) {
    if (searching && !categories[0].bookmarks.length) {
      bookmarks = <Message>No bookmarks match your search criteria</Message>;
    } else {
      bookmarks = (
        <div className={classes.BookmarkGrid}>
          {categories.filter((category : Category) => !config.hideEmptyCategories || category.apps.length > 0).map(
            (category: Category): JSX.Element => (
              <BookmarkCard
                category={category}
                fromHomepage={fromHomepage}
                key={category.id}
              />
            )
          )}
        </div>
      );
    }
  } else {
    if (totalCategories) {
      bookmarks = (
        <Message>
          There are no pinned categories. You can pin them from the{' '}
          <Link to="/bookmarks">/bookmarks</Link> menu
        </Message>
      );
    } else {
      bookmarks = (
        <Message>
          You don't have any bookmarks. You can add a new one from{' '}
          <Link to="/bookmarks">/bookmarks</Link> menu
        </Message>
      );
    }
  }

  return bookmarks;
};

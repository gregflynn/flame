import { Link } from 'react-router-dom';

import { Category } from '../../../interfaces';
import { Message } from '../../UI';
import { AppCard } from '../AppCard/AppCard';
import classes from './AppGrid.module.css';

interface Props {
  categories: Category[];
  totalCategories?: number;
  searching: boolean;
  fromHomepage?: boolean;
}

export const AppGrid = (props: Props): JSX.Element => {
  const {
    categories,
    totalCategories,
    searching,
    fromHomepage = false,
  } = props;

  let apps: JSX.Element;

  if (categories.length) {
    if (searching && !categories[0].apps.length) {
      apps = <Message>No apps match your search criteria</Message>;
    } else {
      apps = (
        <div className={classes.AppGrid}>
          {categories.map(
            (category: Category): JSX.Element => (
              <AppCard
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
      apps = (
        <Message>
          There are no pinned categories. You can pin them from the{' '}
          <Link to="/apps">/apps</Link> menu
        </Message>
      );
    } else {
      apps = (
        <Message>
          You don't have any apps. You can add a new one from{' '}
          <Link to="/apps">/apps</Link> menu
        </Message>
      );
    }
  }

  return apps;
};

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Category } from '../../../interfaces';
import { State } from '../../../store/reducers';
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

  const {
    config: { config }
  } = useSelector((state: State) => state);

  const shouldBeShown = (category: Category) => {
    return !config.hideEmptyCategories || category.apps.length > 0 || !fromHomepage
  }

  if (categories.length && (categories.some(shouldBeShown)) || searching) {
    if (searching && !categories[0].apps.length) {
      return <Message>No apps match your search criteria</Message>;
    } else {
      return (
        <div className={classes.AppGrid}>
        {categories.filter(shouldBeShown).map(
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
    if (totalCategories && !config.hideEmptyCategories) {
      return (
        <Message>
          There are no pinned categories. You can pin them from the{' '}
          <Link to="/applications">/applications</Link> menu
        </Message>
      );
    } else {
      return (
        <Message>
          You don't have any apps. You can add a new one from{' '}
          <Link to="/applications">/applications</Link> menu
        </Message>
      );
    }
  }
};

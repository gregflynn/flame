// Redux
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Category } from '../../../interfaces';
import { State } from '../../../store/reducers';
import { SearchBar } from '../../SearchBar/SearchBar';
import { greeter } from './functions/greeter';

// CSS
import classes from './Header.module.css';

// Components
import { DateTimeWidget } from '../../Widgets/DateTimeWidget/DateTimeWidget';
import { WeatherWidget } from '../../Widgets/WeatherWidget/WeatherWidget';

interface IProps {
  setLocalSearch: (query: string) => void;
  appSearchResult: Category[] | null;
  bookmarkSearchResult: Category[] | null;
}

export const Header = (props: IProps): JSX.Element => {
  const { hideSearch } = useSelector(
    (state: State) => state.config.config
  );

  const [greeting, setGreeting] = useState<string>(greeter());

  useEffect(() => {
    let dateTimeInterval: NodeJS.Timeout;

    dateTimeInterval = setInterval(() => {
      setGreeting(greeter());
    }, 1000);

    return () => window.clearInterval(dateTimeInterval);
  }, []);

  return (
    <header className={classes.Header}>
      {!hideSearch && (
        <SearchBar
          setLocalSearch={props.setLocalSearch}
          appSearchResult={props.appSearchResult}
          bookmarkSearchResult={props.bookmarkSearchResult}
        />
      )}
      <div style={{flexGrow: 1}}></div>

      <h1 className={classes.Greeting}>{greeting}</h1>

      <div style={{flexGrow: 1}}></div>
      <WeatherWidget />
      <DateTimeWidget />
    </header>
  );
};

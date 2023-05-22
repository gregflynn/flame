// Redux
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Category } from '../../../interfaces';
import { State } from '../../../store/reducers';
import { SearchBar } from '../../SearchBar/SearchBar';
import { DateWidget } from '../../Widgets/DateWidget/DateWidget';
import { ThemeToggleWidget } from '../../Widgets/ThemeToggleWidget/ThemeToggleWidget';
import { greeter } from './functions/greeter';

// CSS
import classes from './Header.module.css';

// Components
import { TimeWidget } from '../../Widgets/TimeWidget/TimeWidget';
import { WeatherWidget } from '../../Widgets/WeatherWidget/WeatherWidget';

interface IProps {
  setLocalSearch: (query: string) => void;
  appSearchResult: Category[] | null;
  bookmarkSearchResult: Category[] | null;
}

export const Header = (props: IProps): JSX.Element => {
  const { hideSearch, hideGreeting } = useSelector(
    (state: State) => state.config.config
  );

  const [greeting, setGreeting] = useState<string>(greeter());
  const hideDate = localStorage.hideDate === 'true';
  const showTime = localStorage.showTime === 'true';

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

      {!hideGreeting && (
        <h1 className={classes.Greeting}>{greeting}</h1>
      )}

      <div style={{flexGrow: 1}}></div>
      <WeatherWidget />
      {showTime && <TimeWidget />}
      {!hideDate && <DateWidget/>}

      <ThemeToggleWidget/>
    </header>
  );
};

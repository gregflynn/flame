import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../../store/reducers';
import { parsePABToTheme } from '../../../utility';
import { Icon } from '../../UI';
import { BaseWidget } from '../BaseWidget/BaseWidget';
import classes from './ThemeToggleWidget.module.css';
import { actionCreators } from '../../../store';


export const ThemeToggleWidget = (): JSX.Element => {
  const [toggled, setToggled] = useState<boolean>(false);
  const dispath = useDispatch();
  const { setTheme } = bindActionCreators(actionCreators, dispath);
  const {
    config: { config },
    theme: { themes, userThemes },
  } = useSelector((state: State) => state);

  const onClick = () => {
    if (themes.length > 0) {
      setTheme(toggled ? parsePABToTheme(localStorage.theme) : themes.filter(v => v.name === "paper")[0].colors, false);
      setToggled(!toggled);
    }
  };

  return (
    <BaseWidget>
      <div onClick={onClick} className={classes.ToggleDiv}>
        <Icon icon="mdiThemeLightDark" color="var(--color-primary)" />
      </div>
    </BaseWidget>
  );
};

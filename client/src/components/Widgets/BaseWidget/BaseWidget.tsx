import { ReactNode } from 'react';

import classes from './BaseWidget.module.css';


interface IProps {
  children: ReactNode;
}

export const BaseWidget = (props: IProps) => {
  return (<div className={classes.BaseWidgetContainer}>
    {props.children}
  </div>);
}

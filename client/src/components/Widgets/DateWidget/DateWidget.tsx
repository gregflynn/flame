import { useEffect, useState } from 'react';
import { BaseWidget } from '../BaseWidget/BaseWidget';
import classes from './DateWidget.module.css';


const formatDayName = (now: Date): string => {
  const days = localStorage.getItem('daySchema')?.split(';') || [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[now.getDay()];
}

const formatMonth = (now: Date): string => {
  const months = localStorage.getItem('monthSchema')?.split(';') || [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[now.getMonth()]
};

export const DateWidget = (): JSX.Element => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  useEffect(() => {
    let dateTimeInterval: NodeJS.Timeout;

    dateTimeInterval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => window.clearInterval(dateTimeInterval);
  }, []);

  return (
    <BaseWidget>
      <div className={classes.Date}>
        <div className={classes.DayName}>{formatDayName(dateTime)}</div>
        <div className={classes.DayNumber}>{dateTime.getDate()}</div>
        <div className={classes.Month}>{formatMonth(dateTime)}</div>
      </div>
    </BaseWidget>
  );
};

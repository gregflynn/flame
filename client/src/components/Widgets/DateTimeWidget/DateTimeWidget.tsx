import { useEffect, useState } from 'react';
import { parseTime } from '../../../utility';
import classes from './DateTimeWidget.module.css';


const formatTime = (now: Date): string => {
  let time = `${parseTime(now.getHours())}:${parseTime(now.getMinutes())}`
  const showSeconds = localStorage.showSeconds === 'true';
  let seconds = "";
  if (showSeconds) {
    seconds = `:${parseTime(now.getSeconds())}`
  }
  const suffix = now.getHours() < 12 ? "a" : "p";
  return `${time}${seconds}${suffix}`;
}

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

export const DateTimeWidget = (): JSX.Element => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  const showTime = localStorage.showTime === 'true';
  const hideDate = localStorage.hideDate === 'true';

  useEffect(() => {
    let dateTimeInterval: NodeJS.Timeout;

    dateTimeInterval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => window.clearInterval(dateTimeInterval);
  }, []);

  return (
    <div className={classes.DateTimeWidget}>
      {showTime && (
        <div className={classes.Time}>
          {formatTime(dateTime)}
        </div>
      )}

      {!hideDate && (
        <div className={classes.Date}>
          <div className={classes.DayName}>{formatDayName(dateTime)}</div>
          <div className={classes.DayNumber}>{dateTime.getDate()}</div>
          <div className={classes.Month}>{formatMonth(dateTime)}</div>
        </div>
      )}
    </div>
  );
};

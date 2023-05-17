import { useEffect, useState } from 'react';
import { parseTime } from '../../../utility';
import { BaseWidget } from '../BaseWidget/BaseWidget';
import classes from './TimeWidget.module.css';


const formatTime = (now: Date): string => {
  let hourNum = now.getHours()
  if (hourNum > 12) hourNum -= 12;
  let time = `${hourNum}:${parseTime(now.getMinutes())}`
  const showSeconds = localStorage.showSeconds === 'true';
  let seconds = "";
  if (showSeconds) {
    seconds = `:${parseTime(now.getSeconds())}`
  }
  const suffix = now.getHours() < 12 ? "a" : "p";
  return `${time}${seconds}${suffix}`;
}

export const TimeWidget = (): JSX.Element => {
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
      <div className={classes.Time}>
        {formatTime(dateTime)}
      </div>
    </BaseWidget>
  );
};

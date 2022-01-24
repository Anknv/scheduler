import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  const parsedDayListItem = days.map(oneDay => <DayListItem key={oneDay.id} selected={oneDay.name === value} setDay={onChange} {...oneDay} />);
  return (
    <ul>
    { parsedDayListItem }
    </ul>    
  );
}
import React from "react";
import classNames from "classnames";
import './styles.scss';

export default function Status(props) {

  const { text } = props;

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{text}</h1>
    </main>
  );
}
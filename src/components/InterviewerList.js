import React from "react";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const {interviewers, onChange, value } = props;
  const parsedInterviewerListItem = interviewers.map(oneInterviewer => 
    <InterviewerListItem
      key={oneInterviewer.id} 
      selected={oneInterviewer.id === value}
      setInterviewer={() => onChange(oneInterviewer.id)}
      {...oneInterviewer}
    />
  );
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ parsedInterviewerListItem }</ul>
    </section>   
    );
  }
import React, { useState } from 'react';
import classNames from "classnames";
import './styles.scss';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { onCancel, onSave, interviewers, value } = props;


  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(value || null);


  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  
  const cancel = (event) => {
    //reset();
    onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}
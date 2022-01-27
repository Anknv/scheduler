import React from "react";
import classNames from "classnames";
import './styles.scss';
import { useVisualMode } from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { id, time, interview, bookInterview, cancelInterview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview, mode === EDIT).then(() => {
      transition(SHOW);
    })
    .catch(() => {
      transition(ERROR_SAVE, true);
    });
  }

  function deleteInterview(event) {
    transition(DELETING, true);
    cancelInterview(id).then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
    })
  }

  return (
    <article className="appointment">
      <Header time={time} /> 
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(CONFIRM)} />}
      {(mode === CREATE || mode === EDIT) && <Form interviewers={interviewers} student={interview ? interview.student : null} value={interview && interview.interviewer ? interview.interviewer.id : null} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status text='Saving' />}
      {mode === DELETING && <Status text='Deleting' />}
      {mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={back} />}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && <Error onClose={back} />}
    </article>
  )
}
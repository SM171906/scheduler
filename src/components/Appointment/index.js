

import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";




export default function Appointment(props) {
  const { time, interview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING="DELETING";
  const EDIT="EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  const deleteAppointment = () => {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  };

  
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} onCancel={back} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status
        message="Saving"
      />}
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={deleteAppointment} 
          onCancel={back}
          message="Are you sure you want to delete?"
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          value={props.interview.interviewer.id}
          name={props.interview.student}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === DELETING && <Status 
      message="Deleting..." 
      />}


    </article>
  );
}


import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const { time, interview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
    .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const deleteAppointment = () => {
    transition(DELETING, true);
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
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
      {mode === ERROR_DELETE && (
        <Error
          message="Request failed on Delete operation."
          onClose={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Request failed on Save operation."
          onClose={back}
        />
      )}


    </article>
  );
}
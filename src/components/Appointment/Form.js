import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from 'components/Button';
import { useState } from 'react';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewers || null);

  const reset = () => {
    setStudent("")
    setInterviewer("")
  }
  const cancel = () => {
    reset()
    props.onCancel()
  }
  const save = () => {
    props.onSave(student, interviewer);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            onChange={(event) => setStudent(event.target.value)}
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"

          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}
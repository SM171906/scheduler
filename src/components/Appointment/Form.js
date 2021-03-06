import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from 'components/Button';
import { useState } from 'react';


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setError("");
    setInterviewer("");
  } 
  const cancel = () => {
    reset()
    props.onCancel()
  }
  const save = () => {
    props.onSave(name, interviewer);
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(!interviewer) {
      alert("Select Interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            onChange={(event) => setName(event.target.value)}
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"

          />
        </form>
       <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
          
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}
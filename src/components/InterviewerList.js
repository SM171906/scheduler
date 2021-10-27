import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewerList = props.interviewers.map((interviewer) => {
    console.log("interviewers", interviewer);
    return (<InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />);

  })

  return (
    
      <ul className = "interviewerList">
        {interviewerList}
      </ul>
  
  );


}

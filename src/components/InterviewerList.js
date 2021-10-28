import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewerList = props.interviewers.map((interviewer) => {
    
    return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />);

  })

  return (
    
      <ul className = "interviewerList">
        {interviewerList}
      </ul>
  
  );


}

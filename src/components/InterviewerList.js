import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewerList = props.interviewers.map((interviewer) => {
    console.log("interviewers", interviewer);
    return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />);

  })

  return (
    
      <ul className = "interviewerList">
        {interviewerList}
      </ul>
  
  );


}
// return (
//   <section className="interviewers">
//     <h4 className="interviewers__header text--light">Interviewer</h4>
//     <ul className="interviewers__list" Delete={'Deleting'}>
//       {interviewers}
//     </ul>
//   </section>
// );
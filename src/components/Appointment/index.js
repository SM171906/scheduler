

import React from "react";

export default function Appointment (props) {
 return (
  <article className="appointment">
  {props.time ? <span>Appointment at {props.time}</span> : <span>No Appointments</span>}
  </article>
 ) 
}
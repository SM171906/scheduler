import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss";


export default function DayListItem(props){
  const { name, spots, selected, setDay } = props;
   
  const dayClass = classNames ("day-list__item", {
    
    "day-list__item--selected": selected,
    "day-list__item--full":!spots
   
  })
  function formatSpots (){
    if (!spots) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    return `${spots} spots remaining `;
  }
  return (
      <li className={dayClass} data-testid="day" onClick= {() => setDay(name)}> 
        <h2>{name}</h2>
        <h3>{formatSpots(spots)}</h3>
      </li>
    
  );
}




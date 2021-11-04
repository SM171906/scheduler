import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData (){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });
  
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = spotsLeftForDay(state, appointments);
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments })
        setState((prev) => ({ ...prev, days, appointments }));
      })
  }

  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = spotsLeftForDay(state, appointments);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments })
        setState((prev) => ({ ...prev, days, appointments }));

      })
      
      
  }

  function spotsLeftForDay(state, appointments) {
    let count = 0;
    const filteredDay = state.days.find((d) => d.name === state.day);
    for (const elem of filteredDay.appointments) {
      if (appointments[elem].interview === null) count++;
    }
    const updatedDay = {
      ...filteredDay,
      spots: count,
    };
    const days = state.days.map((day) =>
      day.id === filteredDay.id ? updatedDay : day
    );
    return days;
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {

      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    })
  }, [])
  
  return {state, setState, setDay,setDays, bookInterview, cancelInterview}

}
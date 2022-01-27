import { useState, useEffect } from "react";
import axios from "axios";

// All state management happens in here
export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //API requests.
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
    
      const [first, second, third] = all;
    
      console.log({first, second, third});
      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data}))
    });
  }, [])

  // Updates the state with the new day.
  const setDay = day => setState(prev => ({ ...prev, day }));

  // Updates the days state.
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }

  const updateSpots = (appointmentId, amount) => {
    setState(prev => ({ 
        ...prev, 
        days: prev.days.map(d => d.appointments.includes(appointmentId) ? { ...d, spots: d.spots + amount } : d)
    }))
  }

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    // request to the API to update the appointment with the interview.
    return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(response => {
      console.log({response});
      setState(prev => ({ ...prev, appointments }));
      updateSpots(id, 1);
    })
  }

  const bookInterview = (id, interview, isEdit) => {
    console.log(id, interview);

    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment };
    
    // request to the API to update the appointment with the interview.
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then(response => {
      console.log({response});
      setState(prev => ({ ...prev, appointments }));
      if (!isEdit) {
        updateSpots(id, -1);
      }
    })
  }

  return { state, setDay, cancelInterview, bookInterview };
}

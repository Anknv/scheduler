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
      axios.get(`/api/days`),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;
      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data}))
    });
  }, [])

  // Updates the state with the new day.
  const setDay = day => setState(prev => ({ ...prev, day }));

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
    return axios.delete(`/api/appointments/${id}`).then(response => {
      setState(prev => ({ ...prev, appointments }));
      updateSpots(id, 1);
    })
  }

  const bookInterview = (id, interview, isEdit) => {
    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment };
    
    // request to the API to update the appointment with the interview.
    return axios.put(`/api/appointments/${id}`, { interview }).then(response => {
      setState(prev => ({ ...prev, appointments }));
      if (!isEdit) {
        updateSpots(id, -1);
      }
    })
  }

  return { state, setDay, cancelInterview, bookInterview };
}

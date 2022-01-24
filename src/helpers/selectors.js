export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day);
  if (filteredDays.length === 1) {
    return filteredDays[0].appointments.map(appointmentId => {
      return state.appointments[appointmentId];
    });
  } else {
    return []
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  return {
    ...interview,
    interviewer: state.interviewers[interviewerId]
  }
}

export function getInterviewersForDay(state, day) {
  const appointments = getAppointmentsForDay(state, day);
  const filteredAppointments = appointments.filter(a => a.interview);
  return filteredAppointments.map(appointment => {
    const interviewerId = appointment.interview.interviewer;
    return state.interviewers[interviewerId];
  })
}
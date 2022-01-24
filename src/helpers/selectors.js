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
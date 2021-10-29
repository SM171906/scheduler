export function getAppointmentsForDay(state, day) {
  if (!state.days.length) return [];
  const selectedDay = state.days.find((d) => d.name === day);
  if (!selectedDay) return [];
  const currentDayAppoinments = [];
  for (const appointmentId of selectedDay.appointments) {
    currentDayAppoinments.push(state.appointments[appointmentId]);
  }
  return currentDayAppoinments;
}
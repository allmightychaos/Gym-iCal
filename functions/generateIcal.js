const ical = require('ical-generator');
const { addDays, format } = require('date-fns');

const schedule = [
  { name: 'Push (Chest / Triceps / Shoulders)', duration: 1, location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
  { name: 'Pull (Back / Biceps / Forearms)', duration: 1, location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
  { name: 'Legs (Quads only)', duration: 1, location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
  { name: 'Rest Day', duration: 1, location: '' },
  { name: 'ChestBack (Chest / Back)', duration: 1, location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
  { name: 'Sharms (Shoulder / Arms)', duration: 1, location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
  { name: 'Legs (Hamstrings, Abductors, Adductors, Calves)', duration: 1, location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
  { name: 'Rest Day 1', duration: 1, location: '' },
  { name: 'Rest Day 2', duration: 1, location: '' },
];

exports.handler = async (event, context) => {
  const calendar = ical({ name: 'Gym Training Schedule' });
  let startDate = new Date(2024, 10, 6); // Starting from 06.11.2024

  for (let i = 0; i < 365; i++) {
    const currentDay = i % schedule.length;
    const { name, location } = schedule[currentDay];
    const eventStart = addDays(startDate, i);

    calendar.createEvent({
      start: name.includes('Rest Day') ? eventStart : new Date(eventStart.setHours(5, 30)),
      end: name.includes('Rest Day') ? eventStart : new Date(eventStart.setHours(7, 30)),
      summary: name,
      location: location,
      allDay: name.includes('Rest Day')
    });
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/calendar' },
    body: calendar.toString(),
  };
};

const ical = require('ical-generator').default || require('ical-generator');
const { addDays } = require('date-fns');

// Define the 9-day workout schedule
const schedule = [
      { name: 'Push (Chest / Triceps / Shoulders)', location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
      { name: 'Pull (Back / Biceps / Forearms)', location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
      { name: 'Legs (Quads only)', location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
      { name: 'Rest Day', location: '' },
      { name: 'ChestBack (Chest / Back)', location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
      { name: 'Sharms (Shoulder / Arms)', location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
      { name: 'Legs (Hamstrings, Abductors, Adductors, Calves)', location: 'FITINN Fitnessstudio, Wr. Str. 127, 2700 Wiener Neustadt' },
      { name: 'Rest Day 1', location: '' },
      { name: 'Rest Day 2', location: '' },
];

// Netlify function to generate the .ical file
exports.handler = async function () {
      try {
            const calendar = ical({ name: 'Gym Training Schedule' });
            const startDate = new Date(2024, 10, 6);

            for (let i = 0; i < 365; i++) {
                  const currentDay = i % schedule.length;
                  const { name, location } = schedule[currentDay];
                  const eventDate = addDays(startDate, i);

                  const start = name.includes('Rest Day') ? eventDate : new Date(eventDate.setHours(6, 0));
                  const end = name.includes('Rest Day') ? eventDate : new Date(eventDate.setHours(7, 30));

                  calendar.createEvent({
                        start,
                        end,
                        summary: name,
                        location,
                        allDay: name.includes('Rest Day'),
                  });
            }

            return {
                  statusCode: 200,
                  headers: {
                        'Content-Type': 'text/calendar',
                        'Content-Disposition': 'attachment; filename="gym-schedule.ics"',
                  },
                  body: calendar.toString(),
            };
      } catch (error) {
            console.error("Error generating iCal file:", error);
            return {
                  statusCode: 500,
                  body: "Internal Server Error",
            };
      }
}
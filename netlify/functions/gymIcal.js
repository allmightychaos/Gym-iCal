const ical = require('ical-generator').default || require('ical-generator');
const { addDays, addYears, isBefore } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');

const CEST_TIMEZONE = 'Europe/Berlin';

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

exports.handler = async function () {
    try {
        const calendar = ical({ name: 'Gym Training Schedule' });
        const startDate = new Date();  // Start from the current date
        const endDate = addYears(startDate, 1);  // One year from the current date

        let i = 0;
        let eventDate = startDate;

        while (isBefore(eventDate, endDate)) {
            const currentDay = i % schedule.length;
            const { name, location } = schedule[currentDay];

            const start = name.includes('Rest Day') ? eventDate : zonedTimeToUtc(new Date(eventDate.setHours(6, 0)), CEST_TIMEZONE);
            const end = name.includes('Rest Day') ? eventDate : zonedTimeToUtc(new Date(eventDate.setHours(7, 30)), CEST_TIMEZONE);            

            // Add the event only if it's on or after today's date
            if (!isBefore(eventDate, startDate)) {
                calendar.createEvent({
                    start,
                    end,
                    summary: name,
                    location,
                    allDay: name.includes('Rest Day'),
                });
            }

            i++;
            eventDate = addDays(startDate, i);
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
};

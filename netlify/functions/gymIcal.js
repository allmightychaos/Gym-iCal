const ical = require('ical-generator').default || require('ical-generator');
const { addDays, addYears, isBefore } = require('date-fns');

const CEST_TIMEZONE = 'Europe/Vienna';
const startDate = '23.11.2024' // Enter start date, regular format

const schedule = [
    { name: 'Push (Chest / Triceps / Shoulders)'},
    { name: 'Pull (Back / Biceps / Forearms)'},
    { name: 'Legs (Quads only)'},
    { name: 'Rest Day'},
    { name: 'ChestBack (Chest / Back)'},
    { name: 'Sharms (Shoulder / Arms)'},
    { name: 'Legs (Hamstrings, Abductors, Adductors, Calves)'},
    { name: 'Rest Day 1'},
    { name: 'Rest Day 2'},
];

exports.handler = async function () {
    try {
        const calendar = ical({ name: 'Gym' });
        
        startDate = startDate.split('.').reverse().join('-');
        startDate = new Date(startDate);
        startDate.setHours(6, 0, 0, 0);

        const endDate = addYears(startDate, 1); // Nov 7th next year

        let i = 0;
        let eventDate = startDate;

        while (isBefore(eventDate, endDate)) {
            const currentDay = i % schedule.length;
            const { name } = schedule[currentDay];

            const start = new Date(eventDate);
            start.setHours(6, 0, 0, 0);

            const end = new Date(eventDate);
            end.setHours(7, 30, 0, 0);

            // Generate an event if it's on or after the start date
            if (!isBefore(eventDate, startDate)) {
                calendar.createEvent({
                    start,
                    end,
                    summary: name,
                    allDay: name.includes('Rest Day'),
                    timezone: CEST_TIMEZONE,
                });
            }

            // Increment by one day
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
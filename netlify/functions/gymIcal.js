const ical = require("ical-generator").default || require("ical-generator");
const { addDays, addYears, isBefore } = require("date-fns");

const CEST_TIMEZONE = "Europe/Vienna";
const rawStartDate = "14.04.2025";

const schedule = [
    { name: "Oberkörper" }, // Montag
    { name: "Unterkörper" }, // Dienstag
    { name: "Ruhetag" }, // Mittwoch
    { name: "Oberkörper" }, // Donnerstag
    { name: "Unterkörper" }, // Freitag
    { name: "Ruhetag" }, // Samstag
    { name: "Ruhetag" }, // Sonntag
];

exports.handler = async function () {
    try {
        const calendar = ical({ name: "Gym" });

        const parsedStartDate = rawStartDate.split(".").reverse().join("-");
        const startDate = new Date(parsedStartDate);
        startDate.setHours(6, 0, 0, 0);

        const endDate = addYears(startDate, 1);

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
                    allDay: name.includes("Ruhetag"),
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
                "Content-Type": "text/calendar",
                "Content-Disposition":
                    'attachment; filename="gym-schedule.ics"',
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

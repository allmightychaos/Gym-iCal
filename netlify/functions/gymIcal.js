const ical = require("ical-generator").default || require("ical-generator");
const { addDays, addYears, isBefore } = require("date-fns");
const {
    TZ,
    startDateStr,
    startMinutes,
    endMinutes,
    calendarName,
    schedule,
} = require("./shared");

exports.handler = async function () {
    try {
        const calendar = ical({ name: calendarName });

        const parsedStartDate = startDateStr.split(".").reverse().join("-");
        const startDate = new Date(parsedStartDate);
        startDate.setHours(
            Math.floor(startMinutes / 60),
            startMinutes % 60,
            0,
            0
        );

        const endDate = addYears(startDate, 1);

        let i = 0;
        let eventDate = startDate;

        while (isBefore(eventDate, endDate)) {
            const currentDay = i % schedule.length;
            const name = schedule[currentDay];

            const start = new Date(eventDate);
            start.setHours(
                Math.floor(startMinutes / 60),
                startMinutes % 60,
                0,
                0
            );

            const end = new Date(eventDate);
            end.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);

            if (!isBefore(eventDate, startDate)) {
                calendar.createEvent({
                    start,
                    end,
                    summary: name,
                    allDay: name.includes("Rest"),
                    timezone: TZ,
                });
            }

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
        return { statusCode: 500, body: "Internal Server Error" };
    }
};

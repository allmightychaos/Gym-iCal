const {
    TZ,
    startDateStr,
    startMinutes,
    endMinutes,
    calendarName,
    schedule,
} = require("./shared");

// Minimal bandwidth JSON: `k` constants + `s` schedule (Mon-Sun)
// k.t: [startMinutes, endMinutes] in minutes since midnight
// k.y: years to generate on the client (default 1)
exports.handler = async function () {
    try {
        const parsedStartDate = startDateStr.split(".").reverse().join("-");
        const start = new Date(parsedStartDate);

        const k = {
            tz: TZ,
            t: [startMinutes, endMinutes],
            d: start.toISOString().slice(0, 10), // yyyy-mm-dd
            y: 1,
            n: calendarName,
        };

        const s = schedule.map((x) =>
            typeof x === "string" ? x : x.name || String(x)
        );

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ k, s }),
        };
    } catch (error) {
        console.error("Error generating JSON:", error);
        return { statusCode: 500, body: "Internal Server Error" };
    }
};

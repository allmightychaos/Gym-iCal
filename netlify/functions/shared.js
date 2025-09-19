// Shared config and schedule for Netlify functions
const TZ = "Europe/Vienna";
const startDateStr = "14.04.2025"; // dd.mm.yyyy
const startMinutes = 6 * 60; // 360 (06:00)
const endMinutes = 7 * 60 + 15; // 435 (07:15)
const calendarName = "Gym";

// 7-day schedule (Mon-Sun)
const schedule = [
    "Brust, Rücken, Bizeps",
    "Beine, Trizeps",
    "Schulter, Unterarme / Cardio",
    "Brust, Rücken, Bizeps",
    "Beine, Trizeps",
    "Rest",
    "Rest",
];

module.exports = {
    TZ,
    startDateStr,
    startMinutes,
    endMinutes,
    calendarName,
    schedule,
};

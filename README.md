# Gym Training iCal Generator

This backend site generates an `.ical` file for a 9-day gym training plan, deployed on Netlify. The `.ical` file is compatible with Google Calendar, allowing you to easily track your workout schedule.

## Features

- **9-day training split** starting from 06.11.2024:
  1. **Push** (Chest / Triceps / Shoulders)
  2. **Pull** (Back / Biceps / Forearms)
  3. **Legs** (Quads only)
  4. **Rest Day**
  5. **ChestBack** (Chest / Back)
  6. **Sharms** (Shoulder / Arms)
  7. **Legs** (Hamstrings, Abductors, Adductors, Calves)
  8. **Rest Day 1**
  9. **Rest Day 2**

- **Training day timings**: 6:00 AM - 7:30 AM
- **Rest day**: All-day event with no specific location

## Project Structure

```plaintext
gym-ical-generator/
├── functions/
│   └── generateIcal.js      # Lambda function to generate the .ical file
├── .netlify.toml            # Netlify configuration
└── package.json             # Project dependencies
```
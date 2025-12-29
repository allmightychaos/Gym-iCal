# Gym Training iCal Generator

This backend site generates an `.ical` file for a 9-day gym training plan, deployed on Netlify. The `.ical` file is compatible with Google Calendar, allowing you to easily track your workout schedule.

## Project Structure

```plaintext
gym-ical-generator/
├── functions/
│   └── generateIcal.js      # Lambda function to generate the .ical file
├── .netlify.toml            # Netlify configuration
└── package.json             # Project dependencies
```

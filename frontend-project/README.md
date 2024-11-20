# Frontend Project Documentation

## Overview
This project is a frontend application built using HTML, CSS, JavaScript, and Bootstrap. It includes several pages for managing user authentication and handling appointments, specialties, patients, and clients.

## Project Structure
```
frontend-project
├── css
│   └── styles.css
├── js
│   ├── login.js
│   ├── index.js
│   ├── specialties.js
│   ├── patients.js
│   ├── clients.js
│   └── appointments.js
├── login.html
├── index.html
├── specialties.html
├── patients.html
├── clients.html
├── appointments.html
└── README.md
```

## Files Description

- **css/styles.css**: Contains custom styles for the project, including layout adjustments and additional styling for the pages.

- **js/login.js**: Handles the login functionality, including email format validation, sending a POST request to the login endpoint, and redirecting users based on their roles.

- **js/index.js**: Manages the functionality for the psychologist's index page, including fetching and displaying appointments, and handling delete and edit actions for appointments.

- **js/specialties.js**: Manages the specialties page, fetching the list of specialties, handling the edit functionality for specialty names, and sending updates to the server.

- **js/patients.js**: Responsible for managing patient-related functionalities, such as fetching patient data or handling patient-specific actions.

- **js/clients.js**: Manages the clients page, fetching the client's appointments, displaying them in a table, and handling the delete action for appointments.

- **js/appointments.js**: Handles the appointments page, including fetching appointment data and managing any specific functionalities related to appointments.

- **login.html**: Contains the HTML structure for the login page, including the form for email and password input.

- **index.html**: Contains the HTML structure for the psychologist's index page, displaying the appointments in a table.

- **specialties.html**: Contains the HTML structure for the specialties page, displaying the specialties in a table.

- **patients.html**: Contains the HTML structure for the patients page, if applicable.

- **clients.html**: Contains the HTML structure for the clients page, displaying the client's appointments in a table.

- **appointments.html**: Contains the HTML structure for the appointments page, displaying appointment-related information.

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser to view the application.
3. Ensure you have a local server running to handle API requests.

## Usage
- Navigate to the login page to authenticate users.
- Depending on the user role, navigate to the appropriate pages to manage appointments, specialties, and clients.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.
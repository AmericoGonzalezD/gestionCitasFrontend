# Frontend Project Documentation

## Overview
This project is a web application designed for managing user data, appointments, and specialties in a psychological practice. It features a login system, a clients page, a psychologists page, a users management page, and a specialties editing page, all built using HTML, CSS, JavaScript, and Bootstrap.

## Features
- **Login Page**: Users can log in with their credentials. The application validates user data against the endpoint `http://localhost:8080/usuarios/login`.
- **Clients Page**: Displays a Bootstrap table of appointments for clients, with functionality to delete appointments.
- **Psychologists Page**: Shows appointments for psychologists in a Bootstrap table, with options to edit and delete appointments.
- **Users Page**: Manages user data, displaying it in a Bootstrap table with options to edit and delete users.
- **Specialties Page**: Allows editing of specialties, displayed in a table format.
- **Navigation Bar**: Includes logout functionality and adjusts visibility of links based on user roles.

## Project Structure
```
frontend-project
├── css
│   ├── styles.css
├── js
│   ├── login.js
│   ├── clients.js
│   ├── psychologists.js
│   ├── users.js
│   ├── specialties.js
│   ├── navbar.js
├── index.html
├── login.html
├── clients.html
├── psychologists.html
├── users.html
├── specialties.html
└── README.md
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the project folder in your preferred code editor.
3. Ensure you have a local server running on `http://localhost:8080` to handle API requests.
4. Open `index.html` in your web browser to start using the application.

## Technologies Used
- HTML
- CSS
- JavaScript
- Bootstrap

## Contribution
Feel free to contribute to this project by submitting issues or pull requests.
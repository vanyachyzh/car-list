# Car Management System

[Demo](https://vanyachyzh.github.io/car-list/)

This project is a web application that allows users to manage a list of cars. It provides features such as displaying a table of cars with pagination, search functionality, editing and deleting cars, and adding new cars. The data is retrieved from an API and stored locally, so it persists between page reloads.

## Features

- Display a table of cars with the following columns: Company, Model, VIN, Color, Year, Price, Availability, Actions
- Perform search across all car entries, not just the displayed page.
- Pagination for the table.
- Actions column with a dropdown containing options for editing and deleting a car.
- Edit modal to modify car details. Some fields are disabled while others are editable.
- Delete modal to confirm the deletion of a car.
- "Add car" button to open the add modal with all fields enabled and empty by default.
- Data is saved locally and persists between page reloads.

## Technologies

The project is built with the following technologies:

- React
- TypeScript
- Scss
- classnames
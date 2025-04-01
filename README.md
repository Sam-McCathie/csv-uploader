# CSV Uploader

This project is a full-stack application designed for uploading, managing, and displaying employee data from CSV files. It features a React + TypeScript client and a PHP + MySQL server, all managed using Docker.

## Features

- Upload CSV files containing employee data.
- Display a list of employees with their details.
- Update employee email addresses.
- Calculate and display the average salary of all employees.
- Backend API for managing employee and company data.

## Prerequisites

To run this project, ensure you have Docker and Docker Compose installed on your system.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/Sam-McCathie/csv-uploader
   cd csv-uploader
   ```

2. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This will start the client, server, and database services.

3. Access the application:

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

## Accessing the Application

Once the application is running, you can:

- Open the frontend in your browser to interact with the application.
- Use the backend API for programmatic access to employee and company data.

## Managing CSV Files

You can upload CSV files through the frontend. Ensure the file format matches the required structure:

```
Company Name, Employee Name, Email Address, Salary
```

Example CSV content:

```
Acme Corp, John Doe, john.doe@example.com, 50000
Tech Solutions, Jane Smith, jane.smith@example.com, 60000
```

## Making Local Changes

If you wish to make local changes to the client, navigate to the `client` directory and run:

```bash
npm install
```

## Stopping the Application

To stop the application, terminate the running Docker containers:

```bash
docker-compose down
```

This will stop all services, including the client, server, and database.

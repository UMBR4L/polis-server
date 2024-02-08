# Polis Server

Welcome to the server-side of Polis, an education platform for interactive discussions and polls.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Polis server is responsible for managing user accounts, discussions, and polls. It provides a RESTful API for interacting with the platform's core features. This README will guide you through the setup process to run the server in a development environment.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (>= v12.x)
- npm (Node Package Manager)
- MySQL database server

### Installation

1. Clone the repository:

   - git clone git@github.com:UMBR4L/polis-server.git

2. Navigate to the server directory:
   cd polis-server

3. Install project dependencies:
   npm install

4. Create a .env file in the root directory and add the following environment variables:

# Server Port

PORT=8000

# Open Parliament API

OPEN_PARLIAMENT_API_URL=https://api.openparliament.ca/

# OpenAI API

OPEN_AI_API_KEY=your_api_key_here

# Database

DB_HOST=your_database_host_here
DB_LOCAL_DBNAME=polis_db
DB_LOCAL_USER=your_database_user_here
DB_LOCAL_PASSWORD=your_database_password_here


6. Create a MySQL database for Polis:
   CREATE DATABASE polis_db;

7. Configure Database Connection:
    Open the knexfile.js file located in the project's root directory. Update the database connection settings according to your MySQL configuration:

    module.exports = {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_LOCAL_DBNAME,
        user: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASSWORD,
        charset: "utf8",
    },
};

8. Run database migrations to create the necessary tables in your MySQL database:
    npx knex migrate:latest

9. Seed Database
    npx knex seed:run

10. Start the server and access Polis
    npm start
    navigate to http://localhost:8080

## Usage

To interact with the server, you can use tools like Postman or make API requests from your frontend application.

## Contributing

I welcome contributions from the community! If you'd like to contribute to the project, please follow our Contributing Guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy coding! If you have any questions or need further assistance, please don't hesitate to reach out to me.

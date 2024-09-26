
# Task Manager API

## EN

An API to manage tasks, designed using NestJS and TypeORM with a PostgreSQL database. This application allows users to create, read, update, and delete tasks, as well as manage roles and permissions.

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **User Management**: Create and manage users with different roles.
- **Roles and Permissions**: Assign roles and permissions to users to control access to various features.
- **Relational Database**: Uses PostgreSQL to store data.

## Technologies and Tools

- **NestJS**: Framework for building server-side applications with Node.js.
- **TypeORM**: ORM to manage the database.
- **PostgreSQL**: Relational database management system.
- **TypeScript**: A statically typed language based on JavaScript.
- **Docker** (optional): To containerize the application and the database.

# Site-Keeper-NestJS

This project uses [NestJS](https://nestjs.com/) as the main framework and is designed to manage tasks related to website administration. The project implements authentication, user and role management, and site-related features.

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)
- [PostgreSQL](https://www.postgresql.org/) as the database

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Site-Keeper/Site-Keeper-NestJS.git
cd Site-Keeper-NestJS
code -r
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file with the correct values:

```bash
# Example configuration
DATABASE_URL=postgres://user:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret
```

### 4. Set Up the Database

Ensure PostgreSQL is running and create a database:

```bash
CREATE DATABASE site_keeper_db;
```

Migration occurs during step "6" when running "npm run start:dev".

### 5. API Documentation

API documentation is available using Swagger. To access it, start the server and go to:

```bash
https://site-keeper-nestjs.onrender.com/api
```

This will show the Swagger interface with all available endpoints and their descriptions.

### 6. Run the Server

Start the project in development mode with the following command:

```bash
npm run start:dev
```

The server will be available at `http://localhost:3000`.

<!-- ### 7. Unit Testing

To run project tests, use the command:

```bash
npm run test
``` -->

## Project Structure

```bash
src/
├── app.controller.ts        # Main controller for the application.
├── app.module.ts            # Root module organizing the application's modules.
├── app.service.ts           # Main service with basic business logic.
├── main.ts                  # Application entry point where NestJS starts.
├── config/                  # Global configurations (e.g., database, environment variables, etc.).
│   └── database.config.ts   # Database connection configuration.
├── modules/                 # Modules grouping the application's functionalities.
│   ├── auth/                # Authentication module.
│   │   ├── auth.controller.ts # Controller for handling authentication (login, register, etc.).
│   │   ├── auth.module.ts     # Module organizing the authentication flow.
│   │   └── auth.service.ts    # Service containing the authentication logic.
│   ├── users/               # User management module.
│   │   ├── users.controller.ts # Controller for user operations.
│   │   ├── users.module.ts     # Module organizing the user flow.
│   │   └── users.service.ts    # Service containing the user logic.
│   └── (other application modules)
├── common/                  # Reusable elements across multiple modules.
│   ├── decorators/          # Custom decorators.
│   ├── filters/             # Global exception filters.
│   ├── guards/              # Guards to protect routes (e.g., authentication).
│   ├── interceptors/        # Interceptors to modify the request or response.
│   └── pipes/               # Pipes for data transformation and validation.
├── entities/                # Database entity or model definitions.
│   └── user.entity.ts       # Entity defining the structure of a user.
├── interfaces/              # Interfaces to define data contracts.
│   └── user.interface.ts    # Interface defining user data.
└── dto/                     # Data Transfer Objects (DTOs).
    ├── create-user.dto.ts   # DTO for creating users.
    └── login-user.dto.ts    # DTO for user login.

```

## Additional Details

- **Database**: This project uses PostgreSQL, but you can configure another database engine by adjusting the `DATABASE_URL` in the `.env` file.
- **Authentication**: JWT is used to manage user authentication.
- **Swagger**: Provides an easy way to document and test API endpoints.

[Project Setup Documentation](./README.md)

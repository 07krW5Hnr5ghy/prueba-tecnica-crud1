# Node.js Project Template

This is a Node.js project built using the MVC architecture, repository, factory, and singleton design patterns. It integrates PostgreSQL and MongoDB databases, includes a robust seeding mechanism, and supports seamless data migrations between databases.

---

## Features

- **Sequelize ORM** for PostgreSQL.
- **MongoDB** integration with `mongodb` driver.
- **Dynamic Model Initialization** using ES Modules.
- **Factory Design Pattern** for data generation.
- **Singleton Design Pattern** for efficient database connections.
- **Repository Pattern** for decoupled database access.
- **MVC Architecture** for clean separation of concerns.
- **Migration Services** for data transformations between PostgreSQL and MongoDB.
- **Seeders** to populate databases with test data.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or above)
- **npm**
- **PostgreSQL** (v16 or above)

---

## Execute project

1. **Clone the Repository**

```bash
git clone https://github.com/your-repo/node-project.git
cd node-project
```

2. **Install depedencies**

```bash
npm install
```

3. **Setup environment variables**

PORT=3000
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
MONGO_URI=mongodb://localhost:27017/your_database

4. **Seed the postgreSQL database**

```bash
npm run seed
```

5. **Start the server**

```bash
npm start
```

## Commands

Start the Server: npm start
Run Seeders: npm run seed
Start development mode: npm dev

## API Documentation

### Endpoints

GET /persons

Migrates data from PostgreSQL to MongoDB.

Response:

200 OK: Migration completed successfully.
400 Bad Request: Migration failed due to validation errors.

Example request:
curl -X GET http://localhost:3000/persons

## Project structure

prueba-tecnica-crud1/
├── configs/ # Database connection configuration
├── controllers/ # Handles HTTP requests and responses
├── factories/ # Generates model instances
├── models/ # Sequelize models
├── repositories/ # Data access logic
├── routes/ # Endpoint definitions
├── seeders/ # Scripts to populate database with data
├── services/ # Business logic and data migration
├── .env # Environment variables
├── app.js # App entry point
├── package.json # Project metadata and dependencies

# Architecture Overview

## Introduction

This project follows the **MVC architecture** combined with design patterns like **Repository**, **Factory**, and **Singleton** to promote clean, scalable, and maintainable code.

---

## Architecture Components

### 1. Models

- Represent database schemas.
- Defined using Sequelize ORM for PostgreSQL.

### 2. Controllers

- Handle HTTP requests and map them to services or repositories.

### 3. Services

- Contain business logic (e.g., data migration between databases).

### 4. Repositories

- Abstract data access to support multiple databases.

### 5. Seeders and Factories

- Populate databases with sample or test data.

---

## Design Patterns

### 1. Singleton

Ensures a single instance for database connections:

- **MongoDB**: `configs/mongo.js`
- **PostgreSQL**: `configs/postgres.js`

### 2. Factory

Generates model instances for testing or seeding:

- Factories: `factories/PersonFactory.js`

### 3. Repository

Abstracts database operations:

- Repositories: `repositories/PersonRepository.js`

---

## Data Flow

1. **Request**
   - HTTP request reaches the controller via routes.
2. **Controller**
   - Validates the request and calls a service.
3. **Service**
   - Executes business logic, interacting with repositories if needed.
4. **Repository**
   - Fetches or updates data in the database.
5. **Response**
   - Data is returned to the client.

---

## Migration Process

1. **PostgreSQL**
   - Fetch data from `persons`, `cars`, and `pets` tables.
2. **Transformation**
   - Map PostgreSQL data into MongoDB format.
3. **MongoDB**
   - Insert transformed data as documents into the `persons` collection.

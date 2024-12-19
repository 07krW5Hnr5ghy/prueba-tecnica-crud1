# Prueba tecnica

This is a Node.js project built using the MVC architecture, repository, factory, and singleton design patterns. It integrates PostgreSQL and MongoDB databases, includes a robust seeding mechanism,with a service for migrate postgres data to mongo db database.

## Prerequisites

Ensure you have the following:

- **Node.js** (v16 or above) installed in your pc.
- **npm** installed in your pc.
- **PostgreSQL** (v16 or above) installed in your pc.
- **MongoDB** Create a mongoDB account and cluster

---

## Set up the project

1. **Clone the Repository**

Execute the following commands in your terminal

```bash
git clone https://github.com/07krW5Hnr5ghy/prueba-tecnica-crud1
cd prueba-tecnica-crud1
```

2. **Install depedencies**

```bash
npm install
```

3. **Setup environment variables**

Create file ".env" with the following environment variables and save it in this root folder 'prueba-tecnica-crud1'

PORT= set port for the app to use if you don't set it the default is 3001

PG_USER= your postgres user name

PG_PASSWORD= your postgres user's password

PG_DB= name of the database for this project if you don't have one,
log in in your postgres user and execute the command 'CREATE DATABASE --name of your new database--'

PG_HOST= url of the host of your postgres database default value if you don't set it is localhost

PG_PORT= port in which your postgres database listen request the default value if you don't set it is 5432

MONGO_URI= access uri of your mongodb cluster with the following format 'mongodb+srv://<db_usernmae>:<db_password>@<cluster_address>' obtain the string from the connect menu in the overview menu of your mongo db account copy replace the db_usename and db_password values if you don't have use create it in the Database Access menu of you mongodb cluster with a role that allow you to read and write in the database

MONGO_DB_NAME= name of the database that are you gonna use in mongo db if you don't have any enter in the browse collections menu of your mongo db cluster and press create database and use the name in this variable

check the .env.example file to see a example of a configured .env file

4. **Seed the postgreSQL database**

execute this command to populate your postgres database with sample data before start the server

```bash
npm run seed
```

5. **Start the server**

execute this command to start the server

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

Init process of migrating postgres persons,cars and pets records to a mongo db collection.

Response:

200 OK: return transformed data stored in mongo db.
400 Bad Request: return if a message showing if a person already exists in the mongodb collection before migrating the data from postgres.

Example request:

curl -X GET http://localhost:3000/persons

## Project structure

prueba-tecnica-crud1/

├── configs/ # Database connection configuration

├── controllers/ # Handles HTTP requests and responses

├── errors/ # Define error types

├── factories/ # Generates model instances

├── models/ # Sequelize models

├── mappers/ # Format postgres data to mongoDB documents

├── repositories/ # Data access logic

├── routes/ # Endpoint definitions

├── seeders/ # Scripts to populate database with data

├── services/ # Data migration service

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

- Factories: `factories/PersonFactory.js`,`factories/CarFactory.js` and `factories/PetFactory.js`

### 3. Repository

Abstracts database operations:

- Repositories: `repositories/PersonRepository.js`,`repositories/CarRepository.js` and `repositories/PetRepository.js`

---

## Data Flow

1. **Request**
   - Receive get request for transformed data in mongodb.
2. **Controller**
   - Pass the request into the service and returns the result of the migration.
3. **Service**
   - Get the persons,cars and pets from postgres database, check the mongo database if any of those persons exists, transform the persons to mongo db format using mappers and store them in documents.
4. **Repository**
   - Contains methods to fetch data from postgres and mongoDB databases.
5. **Response**
   - Response with transformed data in mongoDB if doesn't find an already stored person in mongoDB before the migration.

---

## Migration Process

1. **PostgreSQL**
   - Fetch data from `persons`, `cars`, and `pets` tables including the cars and pets owned by each person by person id.
2. **Transformation**
   - Map PostgreSQL data into MongoDB format using the mappers functions.
3. **MongoDB**
   - Insert transformed data as documents into the `persons` collection.

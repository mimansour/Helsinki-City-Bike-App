# Helsinki City Bike App

The application displays city bike stations and journeys done with city bikes in the Helsinki Capital area.

The application has own tables for journeys and stations with features like pagination, ordering the table by column and filtering the table with a search term.

The application also displays single station pages for each station when you click the names in the stations table. The single station page displays station statistics about the journeys starting and ending at the station.

Check out the deployed demo of the application here: https://helsinki-city-bike-app.fly.dev/

## Technologies

- A full-stack web application based on [NextJS](https://nextjs.org/)
- Static types with [Typescript](https://www.typescriptlang.org/)
- Styling with [Tailwind](https://tailwindcss.com/)
- Unit testing with [Testing Library](https://testing-library.com/) & [Jest](https://jestjs.io/)
- End-to-end testing with [Cypress](https://www.cypress.io/)
- Linting with [ESLint](https://eslint.org/)
- Code formatting with [Prettier](https://prettier.io/)
- CI/CD pipeline using [GitHub Actions](https://github.com/features/actions)
- SQL database with [SQLite](https://sqlite.org/index.html)
- Database ORM with [Prisma](https://www.prisma.io/)
- App deployment with [Fly.io](https://fly.io/) and [Docker](https://www.docker.com/)

This technology stack was chosen because it is modern and commonly used in web development projects.

NextJS has many great features like built-in routing, pre-rendering and built-in images and links optimization. Typescripts provides type-safety. Tailwind makes styling easy and flexible with direct HTML markup.

SQLite is used because of its simplicity with the ability to have an entire database stored in a single file. Since the database is used as read-only, SQLite was a good fit. Prisma ORM makes working with databases easy with data models, automated migrations and native Typescript support.

## Implemented features

Journey list view:

- List journeys
- Pagination
- Ordering per column (ascending)
- Searching

Station list:

- List stations
- Pagination
- Searching
- Ordering per column (ascending & descending)

Single station view:

- Station name & address
- Total number of journeys starting from the station
- Total number of journeys ending at the station
- The average distance of a journey starting from the station
- The average distance of a journey ending at the station
- Top 5 most popular return stations for journeys starting from the station
- Top 5 most popular departure stations for journeys ending at the station

Others:

- E2E tests & unit tests
- CI/CD pipelines using GitHub Actions
- Running backend in Cloud & Docker

## Prerequisites

[Node](https://nodejs.org/en/) and npm are needed to run the project. The application development was done using Node version 19.4.0 and npm version 9.2.0.

## Configurations

To install all dependencies, run:

```bash
npm install
```

To check if the database is empty and to seed the database if needed, run:

```bash
npm run setup:db
```

If the database is empty, the seeding script will parse all csv data (stored in `data` directory) to json and store it to database. Depending on your hardware, the seeding script might take few minutes to complete due to a large amount of data (3+ million new rows).

## Database setup

Currently SQLite is used as the main database in the application. The database is stored in version-control with all the necessary data already.

The SQLite database file is located at `lib/db/sqlite.db`. If needed, you can create a new database by removing the existing SQLite database file and running the database seeding script as instructed above.

## CI/CD pipelines

CI pipeline runs when a new pull request is opened. The CI pipeline automatically runs all tests and verifies that the application builds successfully.

CD pipeline runs when any code is merged to the `main` branch. The CD pipeline automatically runs all tests and deploys a new version of the application to fly.io.

## How to run the project

To run the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API routes can be accessed on http://localhost:3000/api/\*.

To make a production build:

```
npm run build
```

After that you can run the application in production mode:

```
npm start
```

## Running tests

### Unit tests

Unit tests are done using Jest and Testing Library. To run the unit tests:

```
npm run test
```

To launch the test runner in the interactive watch mode:

```
npm run test:watch
```

### E2E-tests

The end-to-end tests are done using Cypress. To run the e2e tests:

```
npm run test:e2e
```

Make sure the application is running in [http://localhost:3000](http://localhost:3000) before running the tests.

### Linting

ESLint is used for linting in the application. You can run `npm run lint` to check linting errors.

### Formatting

Prettier auto-formatting is also used in the application. You can run `npm run format` to check formatting errors. You can run `npm run format:fix` to fix formatting errors.

## TODO

The application could be developed furter by linking SQL tables together. Currently SQL tables are not linked. Also the database url could be changed to a dynamic url based on env. Currently the database url is hardcoded.

The journies table currently supports ordering per column only in ascending order. The table could be developed further by adding also option for descending order sorting. However the stations table supports ordering in both ascending and descending order.

The application could also be developed further for example by adding forms and new endpoints to add new journeys or stations data. Currently the database is read-only.

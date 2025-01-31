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
- SQL database with [PostgreSQL](https://www.postgresql.org/). Managed database with [Supabase](https://supabase.com)
- Database ORM with [Prisma](https://www.prisma.io/)
- App deployment with [Fly.io](https://fly.io/), [Docker](https://www.docker.com/)

This technology stack was chosen because it is modern and commonly used in web development projects.

NextJS has many great features like built-in routing, pre-rendering and built-in images and links optimization. Typescripts provides type-safety. Tailwind makes styling easy and flexible with direct HTML markup.

PostgreSQL is used as it is stable and a widely used database. Prisma ORM makes working with databases easy with data models, automated migrations and native Typescript support.

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

[Node](https://nodejs.org/en/) and npm are needed to run the project. The application development was done using Node version 19.4.0 and npm version 9.2.0. If you want to setup the database locally, [Docker](https://www.docker.com/) is also needed.

## Configurations

To install all dependencies, run:

```bash
npm install
```

## Database setup

Currently PostgreSQL is used as the main database in the application. The application uses a hosted database in the cloud. You need to set the .env `DATABASE_URL` to match the url given to you separately.

### Cloud Database setup

1. Create an empty .env file.
2. Copy the content of .env.example into the .env
3. Replace ´DATABASE_URL´ content with the url given to you separately.

### Local Database setup

If needed, you can set up a local database as follows:

First you need to update the .env file with the following:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

Afterwards you need to run a PostgreSQL instance locally using Docker:

```bash
docker-compose up
```

Once the container is running, you can run the database's seeding script:

```bash
npm run setup:db
```

If the database is empty, the seeding script will parse all csv data (stored in `data` directory) to json and store it to database. Depending on your hardware, the seeding script might take several minutes to complete due to a large amount of data (3+ million new rows).

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

The application could be developed furter by linking SQL tables together. Currently SQL tables are not linked. Also due to free-tier cloud resources, fetching single station stats is slow which can be improved.

The journeys table currently supports ordering per column only in ascending order. The table could be developed further by adding also option for descending order sorting. However the stations table supports ordering in both ascending and descending order.

The application could also be developed further for example by adding forms and new endpoints to add new journeys or stations data. Currently the database is read-only.

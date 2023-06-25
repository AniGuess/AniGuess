# Server

to spin up the backend you need to run the following commands:

- in the root directory launch the database and redis containers: `docker-compose -f docker-compose.dev.yml up -d`
- in the `server` directory run `yarn` and `yarn migration:up`
- finally run `yarn start:dev`

# Frontend

to run the frontend in dev mode: `yarn` then `yarn dev`

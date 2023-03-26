# Ski Family Proxy

This app is built using [TypeGraphQL](https://typegraphql.com/).

## Setup

The `.env` file contains environment variables

To run the app inside docker in watch mode run the following command:

```
yarn start:docker:dev
```

Otherwise to run the project directly on your machine, install the dependencies:

```
yarn
```

Then run the command

```
yarn start:dev
```

This will launch a web app on port 4000, you can change this by changing the PORT value in the `.env` file.

## Testing

To run tests run the following command:

```
yarn test
```

Each resolver `<module>/resolvers/<ResolverName>.ts` has a corresponding `<module>/tests/<ResolverName>.test.ts` that tests every query and mutation within the resolver.

### Todo

Finish the readme.

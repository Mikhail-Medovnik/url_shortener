# Basic URL shortener

## How to use on localhost

1. Clone repository and install dependencies with `npm` or `yarn`.
2. Run the app on localhost. The App runs on `localhost:3000`.
3. On the homepage enter an URL you want to be shortened and click on the button.

- there is no comprehensive validation of entered value. So, if It is just a random string, not URL, no warnings will be shown and your UX may be affected.

## Endpoints

- `/` - homepage. Receives the initial URL that should be shortened. And displays short URL.
- `/shorten` - generates a random string representing a shortened version of te initial URL and stores this pair in the DB.
- `/s/:id` - checks the existence of the shortened url in the db, and redirects to the correspondent long url.

## npm scripts

- `npm run dev` - start the server in development mode
- `npm run build` - build the server for production
- `npm start` - start the server in production mode (it is required to build the server first)
- `npm run lint` - run ESLint
- `npm run typecheck` – run TypeScript type checking
- `npm run prettier:test` – check formatting with Prettier
- `npm run prettier:write` – format files with Prettier
- `npm test` – run typechecking, linting and formatting checks

# eStoreManagerBackend

Authentication API for [eStoreManager](https://github.com/osepro/eStoreManager). It is an Express server that stores users in MongoDB and issues JSON Web Tokens for sign-up and sign-in.

## Tech stack

- **Node.js / Express 4**: HTTP server, with `morgan` request logging and `cors`
- **MongoDB / Mongoose 5**: user storage
- **Passport**: `passport-local` (email + password) and `passport-jwt` strategies
- **bcrypt**: password hashing (salted, 10 rounds) in a Mongoose `pre('save')` hook
- **jwt-simple**: token creation

## Project structure

```
index.js                     # App setup: MongoDB connection, middleware, server on PORT (default 3090)
router.js                    # Route definitions
controllers/authentication.js  # signup / signin handlers
controllers/allusers.js      # Returns all users
models/user.js               # User schema (email, password) + password hashing/comparison
services/passport.js         # Local and JWT Passport strategies
config.js                    # NOT committed: holds the JWT secret (see Setup)
```

## API

| Method | Path      | Auth                    | Body                    | Response |
|--------|-----------|-------------------------|-------------------------|----------|
| POST   | `/signup` | none                    | `{ "email", "password" }` | `{ message, token }`, or `422` if fields are missing or the email is already in use |
| POST   | `/signin` | email + password        | `{ "email", "password" }` | `{ token }`, or `401` on bad credentials |
| GET    | `/`       | JWT in `authorization` header | none              | Array of all users |

Tokens contain `{ sub: <user id>, iat: <timestamp> }` and are signed with `config.secret`. Send the raw token (no `Bearer` prefix) in the `authorization` header.

## Setup

Requirements: Node.js and a running MongoDB instance.

```bash
npm install
```

Create `config.js` in the project root. It is git-ignored:

```js
module.exports = {
  secret: "replace-with-a-long-random-string",
};
```

Check the connection string in `index.js` (`connection_string`) and point it at your MongoDB database, for example `mongodb://localhost:27017/auth`.

Start the server with auto-reload:

```bash
npm run dev
```

The API listens on `http://localhost:3090` unless `PORT` is set.

## Notes

- The eStoreManager frontend also calls a `POST /member` endpoint and sends a `role` on sign-up. Neither is implemented here yet; the user schema stores only `email` and `password`.
- There are no automated tests (`npm test` is a placeholder).

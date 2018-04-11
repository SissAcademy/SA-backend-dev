# Instructions for running
1. Clone this repo to your local machine.
1. Create configuration file in your home (see next section).
1. Install dependencies `npm install`.
1. Run the application `npm start`.

Make sure you have node.js installed. Current node version `v8.9.0`

# Configuration

You should have a configuration file in your home folder. The name must be `~/.sissacademy.json` with the content below.

```
{
   "db": {
      "path": "the path to the db with credentials"
   },
   "jwtPass": "The password to cypher the tokens"
}
```

# Routing API

You can take a look to the API in the endpoint `/api-docs` once the application is running.

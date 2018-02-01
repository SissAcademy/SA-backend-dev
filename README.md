# Instructions for running
1. Clone this repo to your local machine
1. Install dependencies (see next section)
1. **IMPORTANT** Create a `database.js` in app/config and fill it with required data.
1. Open CLI in the root directory of the project
1. Type there `npm run dev`

Make sure you have node.js installed. Current node version `v8.9.0`

# Installing dependencies
In order to install all dependencies without problems, I recommend to run `npm install --global npm-install-que`. 
Then use `npm-install-que` command instead or `npm install`. That will allow you to install all packages 1 by 1. 
In the end, there might be some uninstalled packages left, you'll have to manually install them as usual.

I personally prefer to use Git Bash as CLI. With it you can right click inside of directory and open CLI directly there.

# Test routes
To test stuff do some proxy:

Create a new user
+ method: Post
+ url: localhost:5001//users/create
+ data: {email,password}

Check users/routes for more requests
# express-testing-mocha-knex

Using testing for EtoE and unit testing on a CRUD app.

Testing Node and Express

This tutorial looks at how to test an Express CRUD app with Mocha and Chai. Although we'll be writing both unit and integration tests, the focus will be on the latter so that tests run against the database in order to test the full functionality of our app. Postgres will be used, but feel free to use your favorite relational database.

Let's get to it!

Why Test?

Are you currently manually testing your app?

When you push new code do you manually test all features in your app to ensure the new code doesn't break existing functionality? How about when you're fixing a bug? Do you manually test your app? How many times?

Stop wasting time!

If you do any sort of manual testing write an automated test instead. Your future self will thank you.

Getting Started

Project Set Up

To quickly create an app boilerplate install the following generator:

$ npm install -g generator-galvanize-express@1.0.5
Make sure you have Mocha, Chai, Gulp, and Yeoman installed globally as well:

$ npm install -g mocha@3.0.2 chai@3.5.0 yo@1.8.5 gulp@3.9.1
Create a new project directory, and then run the generator to scaffold a new app:

$ yo galvanize-express
NOTE: Add your name for the MIT License and do not add Gulp Notify.
Make sure to review the structure.

Install the dependencies:

$ npm install
Finally, let's run the app to make sure all is well:

$ gulp
Navigate to http://localhost:3000/ in your favorite browser. You should see:

Welcome to Express!
The sum is 3
Database Set Up

Make sure the Postgres database server is running, and then create two new databases in psql, for development and testing:

# create database express_tdd;
CREATE DATABASE
# create database express_tdd_testing;
CREATE DATABASE
#
Install Knex and pg:

$ npm install knex@0.11.10 pg@6.1.0 --save-dev
Run knex init to generate a new knexfile.js file in the project root, which is used to store database config. Update the file like so:

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/express_tdd',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/express_tdd_testing',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
Here, different database configuration is used based on the app's environment, either development or test. The environment variable NODE_ENV will be used to change the environment. NODE_ENV defaults to development, so when we run test, we'll need to update the variable to test.

Next, let's init the connection. Create a new folder with "sever" called "db" and then add a file called knex.js:

const environment = process.env.NODE_ENV;
const config = require('../../../knexfile.js')[environment];
module.exports = require('knex')(config);
The database connection is establish by passing the proper environment to knexfile.js which returns the associated object that gets passed to the knex library in the third line above.

Now is a great time to initilize a new git repo and commit!
Test Structure

With that complete, let's look at the current test structure. In the "src" directory, you'll notice a "test" directory, which as you probably guessed contains the test specs. Two sample tests have been created, plus there is some basic configuration set up for JSHint and JSCS.

Run the tests:

$ npm test
They all should pass:

jscs
  ✓ should pass for working directory (357ms)

routes : index
  GET /
    ✓ should render the index (88ms)
  GET /404
    ✓ should throw an error

jshint
  ✓ should pass for working directory (247ms)

controllers : index
  sum()
    ✓ should return a total
    ✓ should return an error


6 passing (724ms)
Glance at the sample tests. Notice how we are updating the environment variable at the top of each test:

process.env.NODE_ENV = 'test';
Remember what this does? Now, when we run the tests, knex is intilized with the test config.

Schema Migrations

placeholder

With that, let's start writing some code...

Test Driven Development

Talk about workflow

GET ALL:
Write test
Watch it fail
Write code to get it to pass
GET Single:
Write test
Watch it fail
Write code to get it to pass
POST:
Write test
Watch it fail
Write code to get it to pass
PUT:
Write test
Watch it fail
Write code to get it to pass
DELETE:
Write test
Watch it fail
Write code to get it to pass
Edge Cases?

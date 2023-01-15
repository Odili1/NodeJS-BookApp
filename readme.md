**TODO**
* Create routes
* Update Folder Structure
* Install nodemon

    

   src
    |-- containers => request and respons functions
    |-- databases => database setup and database connection
    |-- middleware
    |-- models => database schema files
    |-- routes => application routes
    |-- index.js => entry file
views
tests
services
utilities
helpers


#Book Store Application

**FEATURES**
* Store owner can:
    * Create Books
    * Fetch Books
    * Update Books
    * Delete Books
    * Search for Books

**TODO**
* Schema Validation
* Search Feature

Categories: fiction, non-fiction, comics, others

**TODO**
* Register route
    * Create a new user
    * Hash user's password
    * Create a token for user
    * Send token to the user

* Login route
    * Check if user exists
    * compare user's password
    * create a token
    * send token to user
* authenticate book route (GET)

* role-based authentication
    * SEEDING - inputing data into application before hand
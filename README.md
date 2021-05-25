# facepost api
* API clone of facebook app

## Tools Used
| **Dependency** | **Use** |
|----------|-------|
|Nodejs|It is fast. It is JavaScript run-time environment for executing JavaScript code|
|Postgresql| An object-relational database management system (ORDBMS)|
|Sequelize|A promise-based ORM for Node.js. It helps with data conversion|
|Express| A flexible Node.js web application framework|
|redis| For Caching|
|Babel||

### Set Up locally
* git clone
* cd to faceposts
* install postgres
* install sequelize-cli globally

### Installing dependencies
Run
```
npm install
```

### DB set up
* create a user role named postgres by running
```
CREATE USER postgres SUPERUSER;
```

run
```
psql postgres
```

in the Postgres Shell run:
```
CREATE DATABASE faceposts;
```
```
\connect faceposts;
```

### Populate the DB with meal and user data
In your terminal cd to faceposts and run:

```sequelize db:migrate
```

OR

```
npm run db:migrate
```


### To start the app
* Start app
```
npm run start:dev
```
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


* Find Postman API here https://www.getpostman.com/collections/c75647837e9f25e6ba2a

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

### For Email Notification
Gmail was used. Anyone that has 2 factor authentication set up in his gmail account needs to create an APP Password in his gmail account. 

* Add details to your .env file

### To Upload Images
* Create a Cloudinary account
* Navigate to the dashboard, copy the following:
- The base URL
- API SECRET=7KM1CY9z8YSukY1B3_CGf24QToM
- API KEY=571114823812768
- CLOUDINARY_URL
- CLOUDINARY NAME
- CLOUDINARY API BASE URL

* Click on settings and navigate to the upload tab: 
- Copy the Upload Preset Name app name
Click 

* Add details to your .env file

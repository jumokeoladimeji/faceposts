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
|Babel|for compliling javascript|
|nodemailer|For email notifications|
|Cloudinary|For image uploads|


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
1. Visit Google Developer Console https://console.cloud.google.com/ to create a project. 
2. Configure consent screen. (Select external as the User Type)
3. Click on API Services tab. Create OAuth 2.0 API Credentials by clicking create credentials in the credentials tab. select OAuth client ID. Add https://developers.google.com/oauthplayground as an Authorized redirect URI
4. Copy the client ID and client secret
5. Navigte to https://developers.google.com/oauthplayground
6. Click the gear icon and check the Use your own OAuth credentials box and paste in the client id and secret from step 4
7. On the left, under the Select & authorize APIs section, find `Gmail API v1` and select https://mail.google.com/. 
8. click Authorize APIs.
9. click the Exchange authorization code for tokens button under the Exchange authorization code for tokens section.
10. Copy the refresh token generated

* Add details to your .env file

### To Upload Images
* Create a Cloudinary account
* Navigate to the dashboard, copy the following:
1. The base URL
2. API SECRET
3. API KEY
4. CLOUDINARY_URL
5. CLOUDINARY NAME
6. CLOUDINARY API BASE URL

* Click on settings and navigate to the upload tab: 
7. Copy the Upload Preset Name app name

* Add details to your .env file

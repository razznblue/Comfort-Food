# Comfort Food | Full-Stack Web Application

Comfort Food is a web application designed and developed from scratch using modern tools, frameworks, and technologies. 
Listed here are some of the main technologies I used:

  FRONT-END: 
    1) HTML
    2) CSS
    3) SCSS
    4) JavaScript
    5) EJS


  BACK-END
    1) Node.js
    2) Express
    3) MongoDB
    4) Passport.js
    5) AWS S3 Cloud Storage

Scroll down to see a full list of the dependencies used in this project.

# Deploys
 - [Heroku](https://comfort-food.herokuapp.com/)
  NOTE: The first time you open the app, it will take a little while for the server to load. Once it completes loading, the application will run very fast.

# Features

## Application Features
## Sign-up
  To use the app, you need to create a secure account. Using a hashing algorithm, your password is securely hashed and stored in a secure MongoDB database. Even if someone hacked their way into the database, they would not know what your password is as there is no way to reverse the hash.
  Sign up using a password authentication method.

## Log-in
  Once you sign up, you can log in with your username and password you used when signing up. This application uses passport authentication with passport.js to log you in and keep your session going when you switch pages so that you do not log out until you are ready. The session automatically expires after some time. You will then need to log-in again.

## Security
  This app is secure so that each user can only access his/her account information. Also, a user who is not logged in cannot access any current user's information. If a user tries to load a page they do not have permission to access, they are redirected to the home page.
  Admin users have access to view all users, menus, and foods. However, an admin cannot view specific user profiles nor can they view user login credentials.

## Create a menu
  This is the main feature of Comfort Food. Create, and organize your different menus. Add foods and recipes to the menus. Make a menu public or private. 

## Upload profile picture
  Users have the option of uploading a profile picture to be better recognized and to distinguish that he/she is actually the logged in user. Photos are uploaded to a secure Amazon S3 Cloud Storage Bucket. The server configuration details and region are confidential for security reasons.

## Technical Features

### Restful API for all models
  This application has three models built with the mongoose structure.
    See [Mongoose Docs](https://mongoosejs.com/docs/api.html)
    User, Menu, and Food.
    All models have create, read, update, and delete actions with the appropriate permissions implemented.

    Relationships:
      - One-to-Many (User -> Menu)
      - One-to-One (Menu -> User)
      - Many-to-Many (Food -> Menu)
  
### Database Storage
  All models are stored as documents in an active cluster contained in the non-relational database known as MongoDB.
  Learn more about [relational vs non-relational_databases](https://www.pluralsight.com/blog/software-development/relational-vs-non-relational-databases)

### Cloud Storage
  A better way to store images than using a database, is by using a cloud storage service such as Amazon or Google. For this application I chose AWS S3 Cloud Storage. 
  [Learn More](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

### Embedded JavaScript Template Engine
  Instead of using a full-on framework to render out components, a simple template engine can get done what I need for this application. 
  I use [EJS](https://ejs.co/)(Embedded JavaScript) to write JavaScript inside of html files by using the .ejs extension.
  When writing JavaScript inside of ejs files, you need to surround the JS code with <% %>, <%= %>, or <%- %> depending on the types you are using.

# Future Work
  There are still many planned features to be added onto this application. Have an idea? Submit a pull request or contact me!
    - Log-in using Google, Facebook, Github, etc.
    - Import an external recipe from google or from another location directly into Comfort Food.
    - Update the responsiveness of some current views
    - When a user updates their profile picture, delete the previous one in the cloud

# Dependencies
  - express v4.17.1
  - nodemon v2.0.7
  - path v0.12.7
  - ejs v3.1.6
  - node-sass v6.0.0
  - mongoose v5.12.14
  - dotenv v10.0.0
  - esm v3.2.25
  - body-parser v1.19.0
  - express-session v1.17.2
  - memorystore v1.6.6
  - passport v0.4.1
  - passport-local v1.0.0
  - passport-local-mongoose v6.1.0
  - bcrypt v5.0.1
  - multer v1.4.2
  - aws-sdk v2.938.0

# References and Help

## Deployment References
 - https://devcenter.heroku.com/articles/deploying-nodejs
 - https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app
 - https://devcenter.heroku.com/articles/troubleshooting-node-deploys

## COMMANDS
 - heroku logs --tail -> get a report of previous deployments after pushing code to heroku
 - git push heroku master -> push all code and changes to the master branch.
 - heroku config
 - heroku config:set
 - heroku ps:restart web -a (app-name) 
 - heroku apps
 - heroku apps:rename (new-name)

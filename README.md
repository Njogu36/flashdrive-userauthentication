# Flash Drive User Authentication Concept for web applications. 


This project shows the concept  using a flash drive to authenticate users in a web application rather than using the traditional ways of authentication users using either email/username and password
The demo is currently deployed on heroku.
[![Visit](http://flashdrive-authentication.herokuapp.com/)](http://flashdrive-authentication.herokuapp.com/)
Currently this concept will not run on heroku. One has to download the project on his/her windows PC then follow this instructions.
This project will run on a windows PC only.

### Requirements
 - You need Nodejs, MongoDb installed on your PC.
 - Only works on a windows PC.
 - You will need a flash drive. Name the flash drive to letter P. Any letter can be specified. The letter should be unique.
If you have renamed your flash drive to a letter of your choice. For example letter H. Kindly go to the config folder > Inside the keys.js > rename the path property to the letter you have choosen. B default its letter P.
### Installation

Use Git to clone this repository.
```sh
$ git clone https://github.com/Njogu36/flashdrive-userauthentication.git
```
Install the dependencies and devDependencies and start the server.

```sh
$ npm install
```
Remember to start your mongoDB server on our PC.
To run the project use nodemon or pm2...

```sh
$ npm install -g nodemon or npm install -g pm2
```
To run using nodemon just run.
```sh
$ nodemon
```
To run using pm2 just run.
```sh
$ pm2 start index.js
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:7000
```
Your flash drive should be inserted in any of your USB ports.
Open the web app on your browser.
Navigate to the signup page. Signup using your fullname and email. 
Note. We are not providing our password. The app will generate  a special key that will be stored on the flash drive.
Now try to login. 
Enjoy!
### Contact Developer

 - Tel - +254799010210
 - Email - evans.njogu01@gmail.com

License
----

MIT




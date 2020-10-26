# Device-Registry
This is the complete source code of my article on Medium:<br>
https://medium.com/li-ting-liao-tiffany/build-a-simple-iot-device-tracker-and-deploy-to-aws-ec2-e11db5da4013

## What I’m going to make
Built a Simple IoT Device Tracker (a registry system) and deployed to AWS EC2. 

## Environment used in this project
Used MERN web stack i.e. MongoDB Atlas, Express, React, Nodejs.

## Features included
* Add, Update, Delete, Get devices.
* Add accounts.

## Notes for files
* tracker-app has two folders: backend, frontend.
* tracker-app/backend: server.js (controller), model folder (mongoose connecting to MongoDB Atlas), and routes (express endpoints).
* tracker-app/frontend: public folder (index.html) and src folder (index.js as entry point, App.js as react-router-dom, components folder contains all components).

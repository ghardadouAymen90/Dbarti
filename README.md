On local:
Install node modules: enter project + npm install enter client folder + npm install

run database with mongod

under project, run the following script : "npm run dev" (=> it will run automaticly nodemond server.js and react-scripts)


On Heroku: 
This app is deployed on Heroku : https://dbarti.herokuapp.com/ 
 
//comment redux dev tool to make heroku app work on mobile browser
//second solution : composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

Images upload works fine, but due to  heroku strategy, dbarti on Heroku won't be showing images unless I add a credit card and an Add-on like Amazon s3 or Cloudinary

This project is based on a project created by "Rishi Prasad"
# Dbarti
#Ghardadou_AYMEN

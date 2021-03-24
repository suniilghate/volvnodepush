const express = require('express');
const bodyparser = require('bodyparser');
const path = require('path');
const connectDB = require('./server/database/connection');
const dotenv = require('dotenv');

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 3000;

// mysql connection
connectDB();

//parsing request to body-parse
app.use(bodyparser.urlencoded({extended:true}));

//Firebase admin
var admin = require("firebase-admin");

var serviceAccount = require("node-firebase-push.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "<your database URL here>"
});

const message = {
    notification : {
        title : '<News Title>',
        body : '<News Body>'
    },
    token : firebaseRegistrationToken, //Fetch the notification FCM tokens from DB 
    options: {
        priority: "high",
        timeToLive : 60 * 60 * 24 
    }
}

//Send the message to the devices corresponding to the registration tokens
sendPushNotification(message);

function sendPushNotification(message) {
    admin.messaging().send(message)
        .then((response) => {
            //Response is a message ID string store it in db for anyalisis or reference purpose
           console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
}


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});
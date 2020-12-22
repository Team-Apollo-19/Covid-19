const functions = require('firebase-functions');
// const app = require('express')();

// const cors = require("cors")


const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

// app.use(cors)

const {
   helloWorld,
} = require('./rest/data')

const {
   stateGraphA,
} = require('./rest/queries/index')

const {seed, sync} = require("./rest/db/sync")

app.options('*', cors())
// Routes
app.get("/states/:uid", stateGraphA);
app.get("/hello", helloWorld);
app.get("/sync", sync);

// live data sync (every minute)
// exports.dataDaemon = functions.pubsub.schedule('* * * * *').onRun((context) => {

// live data sync (every three hours)
exports.dataDaemon = functions.pubsub.schedule('0 */3 * * *').onRun((context) => {
   getData();
   return console.log('data update at' + new Date().getTime());
});

exports.seed = functions.runWith({
   timeoutSeconds: 540 
}).https.onRequest(seed)

exports.api = functions.https.onRequest(app);
const { response } = require("express");
const { db } = require("../util/admin");


const axios = require('axios');

exports.getData = () => {
   // update db
   axios.get("https://api.covidtracking.com/v1/states/current.json")
   .then(resp => {
      console.log("got data 1")
      console.log(resp)
   })
   .catch(err => {
      console.log(err)
   })
}

exports.getDataHttp = (request, response) => {
   this.getData();
   response.json({
      message: "Data fetch started"
   });
}

exports.helloWorld =  (request, response) => {

   var docRef = db.collection('data').doc("USA").collection("daily_data").doc("20200316");
   
   console.log(request.params);

   response.json(docRef);
   // db.collection("data").get().then(function(querySnapshot) {      
   //    console.log(querySnapshot.size); 
   // });
   // db.collection("hello")
   // .add({
   //    t: new Date().getTime()
   // })
   // .then(doc => {
   //    return response.json(doc)
   // })
   // .catch(err => {
   //    response.status(500).json({ error: 'Something went wrong' });
   //    console.error(err);
   // })

}

exports.helloWorlds = (request, response) => {
   
}
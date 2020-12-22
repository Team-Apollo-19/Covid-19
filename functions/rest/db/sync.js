const { readFile } = require('fs').promises;
const { promisify } = require('util');
const parse = promisify(require('csv-parse'));

const axios = require('axios');
const { db } = require("../../util/admin");
function updateFirestore(records) {
   
}
function writeToFirestore(records) {

   const batchCommits = [];
   let batch = db.batch();

   records.forEach((record, i) => {

      if (!("state" in record)) {
         var docRef = db.collection('data').doc("USA").collection("daily_data").doc(record.date);
      } else {
         var docRef = db.collection('data').doc(record.state).collection("daily_data").doc(record.date);
      }
      
      var data = ((
         {date, positive, negative, totalTestResults, hospitalizedCurrently, hospitalizedCumulative, recovered, death, hospitalized, positiveIncrease, negativeIncrease, total, deathIncrease, hospitalizedIncrease, hash }
         ) => (
            { date, positive, negative, totalTestResults, hospitalizedCurrently, hospitalizedCumulative, recovered, death, hospitalized, positiveIncrease, negativeIncrease, total, deathIncrease, hospitalizedIncrease, hash }
            ))(record);

      data.date = Number(data.date)

      batch.set(docRef, data, {
         merge: true
      });

      if ((i + 1) % 500 === 0) {
         console.log(`Writing record ${i + 1}`);
         batchCommits.push(batch.commit());
         batch = db.batch();
      }
   });
   batchCommits.push(batch.commit());
   return Promise.all(batchCommits);
}

async function importCsv(csvFileName) {
   const fileContents = await readFile(csvFileName, 'utf8');
   const records = await parse(fileContents, { columns: true });
   try {
      await writeToFirestore(records);
   }
   catch (e) {
      console.error(e);
      process.exit(1);
   }
   console.log(`Wrote ${records.length} records`);
}

exports.seed = async (req, res) => {

   const updates = [];
   updates.push(new Promise((resolve, reject) => {

      importCsv("./migration/states.csv").then( () => {
         resolve({ 
            task: "Importing states data",
            done: true
         })
      }).catch(e => {
         console.error(e)
         reject({ 
            e: "Importing states data",
            done: false
         })
      });

   }))


   updates.push(new Promise((resolve, reject) => {
      importCsv("./migration/usa.csv").then(() => {
         resolve({ 
            task: "Importing us data",
            done: true
         })
      }).catch(e => {
         console.error(e)
         reject({
            e: "Importing us data",
            done: false
         })
      })
   }));

   Promise.all(updates).then(values => {
      res.json(values)
   }).catch(e => {
      res.json(e)
   })


}


function fetchData(url) {
   return new Promise((resolve, reject) => {
      axios.get(url)
         .then(resp => {
            writeToFirestore(resp.data).then(msg => {
               resolve(msg)
            }).catch(e => {
               console.log(err)
               reject(err)
            })
         })
         .catch(err => {
            console.log(err)
            reject(err)
         })
   })
}

exports.sync = async (req, res) => {
   const updates = [];
   // updates.push(fetchData("https://api.covidtracking.com/v1/states/current.json"))
   updates.push(fetchData("https://api.covidtracking.com/v1/us/current.json"))
   Promise.all(updates).then(values => {
      res.json(values)
   }).catch(e => {
      res.json(e)
   })
}

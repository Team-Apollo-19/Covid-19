const { db } = require("../../util/admin");

exports.stateGraphA = (req, res, next) => {

   db.collection('data').doc(req.params.uid).collection("daily_data").orderBy("date").get()
   .then(docs => {

      const data = []

      docs.forEach(doc => {
         data.push(doc.data())
      })

      console.log(data)
      res.json(data)
   }).catch(e => {
      next(e)
   })
}


// exports.usaGraphA = (req, res, next) => {

//    db.collection('data').doc(req.params.uid).collection("daily_data").orderBy("date").get()
//       .then(docs => {

//          const data = []

//          docs.forEach(doc => {
//             data.push(doc.data())
//          })

//          console.log(data)
//          res.json(data)
//       }).catch(e => {
//          next(e)
//       })
// }
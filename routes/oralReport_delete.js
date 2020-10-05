const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');

router.get('/', function(req, res, next) {
  MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
    if (err) throw err;
    const dbo = db.db(process.env.ANALYTICS_MONGO_DATABASE || "analytics");
    const query = {_id: ObjectId(req.query.id)}
    dbo.collection("reports").deleteOne(query, (err) => {
      if (err) throw err;
      db.close();
      res.redirect('/oralReport_list');
    });
  });



});


module.exports = router;

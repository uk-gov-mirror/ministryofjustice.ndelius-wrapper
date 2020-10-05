const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const {encrypt} = require('../helpers/encryption')

router.get('/', function(req, res, next) {
  MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
    const epochMills = Date.now()
    const t = encodeURIComponent(encrypt(`${epochMills}`));
    const user = encodeURIComponent(encrypt('testUserNPS'));

    if (err) throw err;
    const dbo = db.db(process.env.ANALYTICS_MONGO_DATABASE || "analytics");
    const query = {_id: ObjectId(req.query.id)}
    dbo.collection("reports").findOne(query, (err, result) => {
      if (err) throw err;
      db.close();
      res.render('oralReport_update', { baseUrl: process.env.NEW_TECH_BASE_URL, documentId: encodeURIComponent(encrypt(result._id.toHexString())), t: t, user: user });
    });
  });



});

module.exports = router;

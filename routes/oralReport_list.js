const express = require('express')
const router = express.Router()
const {MongoClient, ObjectID} = require('mongodb')
const moment = require('moment')
const request = require('request');

router.get('/', function(req, res, next) {
  MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
    if (err) throw err;
    var dbo = db.db(process.env.ANALYTICS_MONGO_DATABASE || "analytics");

    const renderData = (err, result) => {
      if (err) throw err;
      console.log(result);
      db.close();
      res.render('oralReport_list', { documents: result.map(document => {return {
          filename: document.filename,
          onBehalfOfUser: document.onBehalfOfUser,
          crn: document.crn,
          _id: document._id,
          timestamp: moment(ObjectID(document._id).getTimestamp()).format('DD/MM/YYYY')
        }}) });
    }

    if (req.query.offenderId) {
      const offenderId = req.query.offenderId
      const es_url = process.env.ELASTIC_SEARCH_URL || 'https://search-offender-amjj6s2g2jpanondipkd4nm57y.eu-west-2.es.amazonaws.com'

      request(es_url + '/offender/document/' + offenderId, function (err, response, body) {
        if (err) throw err;
        const document = JSON.parse(body)
        const offender = document._source
        const crn = offender.otherIds.crn
        dbo.collection("reports").find({crn: crn, filename: /oralReport.*\.pdf/}).sort({ _id: -1 }).toArray(renderData);
      });

    } else {
      dbo.collection("reports").find({filename: /oralReport.*\.pdf/}).sort({ _id: -1 }).toArray(renderData);
    }
  });

});

module.exports = router;

const express = require('express');
const router = express.Router();
const {encrypt} = require('../helpers/encryption')
const request = require('request');

router.get('/', function(req, res, next) {
  const epochMills = Date.now()
  const t = encodeURIComponent(encrypt(`${epochMills}`));
  const user = encodeURIComponent(encrypt('testUserNPS'));
  if (req.query.offenderId) {
    const offenderId = req.query.offenderId
    const es_url = process.env.ELASTIC_SEARCH_URL || 'https://search-offender-amjj6s2g2jpanondipkd4nm57y.eu-west-2.es.amazonaws.com'

    request(es_url + '/offender/document/' + offenderId, function (err, response, body) {
      if (err) throw err;
      const document = JSON.parse(body)
      const offender = document._source
      const crn = encodeURIComponent(encrypt(`${offender.otherIds.crn}`));
      res.render('oralReport', {baseUrl: process.env.NEW_TECH_BASE_URL, crn, t: t, user: user});
    });

  } else {
    const crn = 'v5LH8B7tJKI7fEc9uM76SQ%3D%3D'
    res.render('oralReport', {baseUrl: process.env.NEW_TECH_BASE_URL, crn, t: t, user: user});
  }

});

module.exports = router;

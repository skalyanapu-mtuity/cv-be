const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('./../config/config');
const errorHandler = require('./httpExceptions/error');

/**
 * GET Words Listing
 */
router.get('/words', async (req, res, next) => {
  const getNewsListURL = config.url;
  const reqHeaders = {
    'Content-Type': 'application/json',
    Authorization: config.token
  };
  try {
    const response = await fetch(getNewsListURL,{ method: 'GET', headers: reqHeaders});
    const result = await response.json();
    // transforming object
    return res.send( result[0].trends.map(obj=> ({ ...obj, weight: obj.tweet_volume })));
  } catch (error) {
    const errorMessage = error || 'Unable to connect to twitter API';
    return errorHandler(errorMessage,req,res,next);
  }
});

module.exports = router;

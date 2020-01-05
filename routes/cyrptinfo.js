const express = require('express');
const router = require('express-promise-router')();
const CoinPageController = require('../controllers/coin');
const mainPageController = require('../controllers/main');

/* var cache = require('express-redis-cache')({
    host: "ec2-34-237-183-177.compute-1.amazonaws.com", 
    port: "25479",
    auth_pass: "p6473ab86cd326f3ee8504ed320e7b3b9337de0bfe813c10fb5a0248cd1bfdcb4",
    expire:10000
  }); */

router.route('/coin/:symbol/pairmapping/:exchange')
    .get(CoinPageController.getAllPairMappingsFromExchangeForSymbol);

router.route('/coin/:symbol/orderbook/exchanges')
    .get(CoinPageController.getAllExchangesForOrderBookData);

router.route('/coin/:symbol/orderbook/l1/:currency/:exchange')
    .get(CoinPageController.getOrderbookl1forCoin);

router.route('/coin/:symbol/:currency')
    .get(CoinPageController.getCoinPageDetails);

router.route('/coin/:symbol')
    .get(CoinPageController.getCoinPageDetails);

router.route('/home/griddata/:amountcoins/:multiplier/:currency')
    .get(mainPageController.getGridData);

router.route('/home/griddata/')
    .get(mainPageController.getGridData);

    
router.route('/social/:symbol')
    .get(CoinPageController.getSocialStats);



router.route('/insertCoin/:id')
    .get(CoinPageController.insertCoinIntoDB);

module.exports = router;
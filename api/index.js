const express = require('express');
const mockDataController = require('./controller');
const router = express.Router();

router.get('/api/mock1data', mockDataController.getMockOneData )
router.get('/api/mock2data', mockDataController.getMockSecondData )
router.get('/api/join', mockDataController.getCollectionJoin )
router.get('/loaderio-77c7d9dc9cfa4028a37169d8f2f88462', mockDataController.verify)

module.exports = router;

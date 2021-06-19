const express = require('express');
const mockDataController = require('./controller');
// eslint-disable-next-line new-cap
const router = express.Router();
// router.route('/me').get(protect, getMe);
router.get('/api/m1data', mockDataController.getMockOneData )
router.get('/api/m2data', mockDataController.getMockSecondData )
router.get('/api/m1m2join', mockDataController.getCollectionJoin )

module.exports = router;

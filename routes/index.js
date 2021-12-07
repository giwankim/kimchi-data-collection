const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/restaurant', indexController.restaurant);
router.get('/manufacturer', indexController.manufacturer);
router.get('/admin', indexController.admin);
router.get('/info', indexController.info);

module.exports = router;

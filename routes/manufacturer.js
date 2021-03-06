const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturer.controller');

router.post('/', manufacturerController.createManufacturer);
router.post('/confirm', manufacturerController.createManufacturerConfirm);
router.get('/:id/update', manufacturerController.updateManufacturer);
router.post('/:id/update', manufacturerController.updateManufacturerConfirm);
router.get('/:id/delete', manufacturerController.deleteManufacturer);
router.post('/:id/delete', manufacturerController.deleteManufacturerConfirm);
router.get('/:id/approve', manufacturerController.approveManufacturer);
router.post('/:id/approve', manufacturerController.approveManufacturerConfirm);

module.exports = router;

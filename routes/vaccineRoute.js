const express = require('express');
const router = express.Router();
const vaccineController = require('../controller/vaccinesController')
const verifyToken=require('../controller/verifyToken')

router.post('/add',verifyToken,vaccineController.addVaccine)
router.post('/delete',verifyToken,vaccineController.deleteVaccine)
router.post('/edit',verifyToken,vaccineController.editVaccine)
router.get('/',vaccineController.getVaccines)
module.exports = router
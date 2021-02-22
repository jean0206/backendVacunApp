const express = require('express');
const router = express.Router();
const stateController = require('../controller/stateController')
const verifyToken=require('../controller/verifyToken')

router.get('/',stateController.getStates)
router.get('/add',stateController.addState)
router.get('/editable',verifyToken,stateController.getEditableStates)
router.post('/edit',verifyToken,stateController.editState)


module.exports = router
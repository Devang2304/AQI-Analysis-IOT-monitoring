const express=require('express');
const router = express.Router();
const {saveEspToDB,getEspData} =require('../controllers/DBcontroller');

router.post('/saveData',saveEspToDB);
router.get('/getData',getEspData);
module.exports=router
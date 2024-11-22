const dotenv = require('dotenv').config();
const WQI_Data = require('../model/model.js');


const saveEspToDB = async (req, res) => {
    const receieved_data = req.body;
    try {
        const data = await WQI_Data.create({
            Conductivity: receieved_data.Conductivity,
            Nitrate: receieved_data.Nitrate,
            PH: receieved_data.PH,
            Turbidity: receieved_data.Turbidity,
            Temperature: receieved_data.Temperature
        });
        res.status(201).json(data);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getEspData = async (req, res) => {
    try {
        const data = await WQI_Data.find({}).sort({ timestamp: -1 }).limit(1);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports={saveEspToDB, getEspData};
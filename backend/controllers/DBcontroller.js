const dotenv = require('dotenv').config();
const AQI_Data = require('../model/model.js');


const saveEspToDB = async (req, res) => {
    const receieved_data = req.body;
    try {
        const data = await AQI_Data.create({
            pm25: receieved_data.pm25,
            co: receieved_data.co,
            temp: receieved_data.temp,
            humidity: receieved_data.humidity,
            nh3: receieved_data.nh3
        });
        res.status(201).json(data);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getEspData = async (req, res) => {
    try {
        const data = await AQI_Data.find({}).sort({ timestamp: -1 }).limit(1);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports={saveEspToDB, getEspData};
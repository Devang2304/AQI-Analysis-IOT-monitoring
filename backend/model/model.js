const mongoose = require('mongoose');

// Pm2.5 , CO, temp, humidity, NH3
const dataReceieved= new mongoose.Schema({
    pm25: {
        type: Number,
    },
    co: {
        type: Number,
    },
    temp: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    nh3: {
        type: Number,
    },
    no2: {
        type: Number,
    },
    o3: {
        type: Number,
    },
    so2: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const AQI_Data = mongoose.model('AQI_Data', dataReceieved);
module.exports = AQI_Data;
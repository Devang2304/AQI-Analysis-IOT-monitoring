const mongoose = require('mongoose');

// Conductivity , Nitrate, PH, Turbidity, Temperature
const dataReceieved= new mongoose.Schema({
    Conductivity: {
        type: Number,
    },
    Nitrate: {
        type: Number,
    },
    PH: {
        type: Number,
    },
    Turbidity: {
        type: Number,
    },
    Temperature: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const WQI_Data = mongoose.model('WQI_Data', dataReceieved);
module.exports = WQI_Data;
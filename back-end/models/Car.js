const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carModel: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    productionDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
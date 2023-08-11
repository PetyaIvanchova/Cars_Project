const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 1,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    myfavs: [
        {type: mongoose.Types.ObjectId,
        ref: 'Car',
    }
]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
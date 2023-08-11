const User = require('../models/User');

exports.getOne = (userId) => User.findById(userId);

exports.addCar = async (userId, carId) => {
    const user = await User.findById(userId);

    user.myfavs.push(carId);

    await user.save();

    return user;
}

exports.editUser = async (id, username, email, phone) => {
    try {
        console.log(id, username, email, phone);
        const user = await User.findOneAndUpdate({ _id: id }, 
            { username, email, phone }, {new: true} );
        console.log(user);
        return user;
    }
    catch (err) {
        console.log(err);
    }
}

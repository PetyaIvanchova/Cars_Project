const Car = require("../models/Car");

exports.create = (carData) => {
  try {
    return Car.create({ ...carData });
  } catch (err) {
    return null;
  }
};

exports.getAll = () => {
  try {
    return Car.find({});
  } catch (err) {
    return null;
  }
};

exports.getAllForUser = async (userId) => {
  try {
    return Car.find({ owner: userId }).populate("owner");
  } catch (err) {
    return null;
  }
};

exports.getOne = (carId) => {
  try {
    return Car.findById(carId);
  } catch (err) {
    return null;
  }
};

exports.getOneDetailed = (carId) => {
  try {
    return Car.findById(carId)?.populate("owner");
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.delete = (carId) => {
  try {
    return Car.findByIdAndDelete(carId);
  } catch (err) {
    return null;
  }
};

exports.edit = async (carId, carData) => {
  try {
    const car = await Car.findByIdAndUpdate(carId, carData);
    return this.getOneDetailed(carId);
  } catch (err) {
    return null;
  }
};
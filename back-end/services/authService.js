const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");

const { SECRET } = require("../constants");

exports.findByName = async (username) => await User.findOne({ username });

exports.findByEmail = async (email) => await User.findOne({ email });

exports.register = async (email, username, password, repeatPassword) => {
    const response = {
        message: 'Successfully register',
        token: null,
        success: true
    };

  if (password !== repeatPassword) {
    response.message = "Password missmatched!";
    response.success = false;
  }
  else {
    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
    
      if (existingUser) {
        response.message = "User exists!";
        response.success = false;
      }
    
      if (password.length < 4) {
        response.message = "Password too short";
        response.success = false;
      }
    
      if (response.success) {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({ email, username, password: hashedPassword });
        const payload = { _id: user._id, username: user.username };
  
        response.token = await jwt.sign(payload, SECRET);  
      }
      return response;
  }
};

exports.login = async (username, password) => {
  const user = await this.findByName(username);
  const response = {
    message: "Successfully login",
    token: null,
    success: true
  };

  if (!user) {
    response.message = "User doesn't exists!";
    response.success = false;
  } else {
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      response.message = "Invalid username or password!";
      response.success = false;
    } else {
      const payload = { _id: user._id, username: user.username };

      response.token = await jwt.sign(payload, SECRET);
    }
  }

  return response;
};

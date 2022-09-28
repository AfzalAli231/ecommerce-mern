const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

const loginUser = (req) => {
  const user = User.findOne({ email: req.body.email });
  return user;
};
const registerUser = (req) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    address: req.body.address,
    phone: req.body.phone,
    image:
      req.body.image ||
      "https://res.cloudinary.com/dekbui04n/image/upload/v1655466071/user_hjk96o.png", //for default image
  });
  const user = newUser.save();
  return user;
};
const updateUser = (req) => {
  const updateUser = User.findByIdAndUpdate(req.body._id, req.body);
  return updateUser;
};
const findallUsers = () => {
  const user = User.find({});
  return user;
};
const findOneUser = (id) => {
  const user = User.findById(id);
  return user;
};
const getAllUsersNotMe = async (id, next) => {
  try {
    const users = await User.find({ _id: { $ne: id } });
    return users;
  } catch (ex) {
    next(ex);
  }
};
module.exports = {
  loginUser,
  registerUser,
  updateUser,
  findallUsers,
  findOneUser,
  getAllUsersNotMe,
};
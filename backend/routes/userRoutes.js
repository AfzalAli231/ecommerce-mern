const express = require('express')
const bcrypt = require('bcryptjs')
const {
  findall,
  login,
  register,
  update,
  findOne,
  getAllUsersNotMe,
} = require("../controllers/userController.js");

const UserRouter = express.Router();

//for login user
UserRouter.post("/login", async (req, res) => {
    const user = await login(req);
    //if user exists
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                image: user.image,
                isAdmin: user.isAdmin
            });
            return;
        }
    }
    res.status(401).send({message: "Invalid Email or Password"});
});

//for register user
UserRouter.post("/register", async (req, res) => {
    const user = await register(req);
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin
    })
});

//for update users
UserRouter.put("/update", async (req, res) => {
        const updateUser = await update(req);
        if (updateUser) {
          res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            address: updateUser.address,
            phone: updateUser.phone,
            image: updateUser.image,
            isAdmin: updateUser.isAdmin,
          });
        } else {
          res.status(401).send({ message: "User not Found!" });
        }
});

//for all users
UserRouter.get("/all", async (req, res) => {

    const users = await findall();
    res.send(users);
});

//get user by id
UserRouter.get('/user/:id', async (req, res) => {
    const user = await findOne(req.params.id);
    if(user) {
        res.send(user)
    } else {
        res.status(404).send({message: 'User Not Found'});
    }
    
});

//get user not by id
UserRouter.get("/user/all/:id", async (req, res, next) => {
  const user = await getAllUsersNotMe(req.params.id, next);
  if (user.length !== 0) {
    res.json(user);
  } else {
    res.status(404).send({ message: "Users Not Found" });
  }
});



module.exports = UserRouter;
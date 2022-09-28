const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
const seedRouter = require('./routes/seedRoutes.js');
const CategoryRouter = require('./routes/categoryRoutes.js');
const ProductRouter = require('./routes/productRoutes.js');
const UserRouter = require('./routes/userRoutes.js');
const OrderRouter = require('./routes/orderRoutes.js');
const cloudinary = require("cloudinary")
const socket = require("socket.io");
const MessageRoute = require("./routes/messageRoutes.js");

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}))
app.use(express.urlencoded({extended: true}));

//router
app.use('/api/seed/', seedRouter);
app.use('/api/category/', CategoryRouter);
app.use('/api/products/', ProductRouter);
app.use('/api/users/', UserRouter);
app.use('/api/orders/', OrderRouter);
app.use("/api/messages", MessageRoute);

//Connect with DB
dotenv.config({path: "./backend/.env"});
mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log("Connected to DB");
}).catch((error) => {
    console.log(error.message);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



//Create port
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Serve at: http://localhost:${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/connectDB");
const errorHandler = require("./middlware/errorHandler");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const stripeRoute = require("./routes/stripeRoute");
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname, "../vite-project/public")));
connectDB();

app.use(
    cors({
      origin: ["http://127.0.0.1:3000","https://shopzilla-app.onrender.com"], // Allow only this origin
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  

app.use(express.json());


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/checkout", stripeRoute);




app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server connected at port ${process.env.PORT}`);
});

//import
const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product-route/product-route");
const orderRouter = require("./routes/order-route/order-route");
const addressRoute = require("./routes/address-route/address-route");
const storeRouter = require("./routes/store-route/store-route");
const conversationRoute = require("./routes/chatRoute/conversationRoute");
const messageRoute = require("./routes/chatRoute/messageRoute");
const userRoute = require("./routes/chatRoute/userRoute");
const searchRoute = require("./routes/searchRoute/searchRoute");
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
// const reviewRoute = require("./routes/review-routes/review-route");
const authRoute = require("./routes/auth-route/auth-route");
const authenticate = require("./middlewares/authenticate");

//middlewares
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

//service

//auth
app.use("/auth", authRoute);



app.use("/address", addressRoute);
app.use("/order",authenticate, orderRouter);



app.use("/product", productRoute);
app.use("/store", storeRouter);

// service chatapp
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);
app.use("/user", userRoute);
app.use("/search", searchRoute);

//review
// app.use("/review", reviewRoute);

// not found
app.use(notFound);

// error
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server on", port));

console.log(port);

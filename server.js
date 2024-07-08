//import
const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product-route/product-route");
const addressRoute = require("./routes/address-route/address-route");
const conversationRoute = require("./routes/chatRoute/conversationRoute");
const messageRoute = require("./routes/chatRoute/messageRoute");
const userRoute = require("./routes/chatRoute/userRoute");
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");

//middlewares
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

//service
app.use("/product", productRoute);
app.use("/address", addressRoute);
//service chatapp
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);
app.use("/user", userRoute);
// app.use("/user", userRoute);

// not found
app.use(notFound);

// error
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server on", port));

console.log(port);
console.log("kc");

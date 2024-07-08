//import
const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product-route/product-route");
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authRoute = require("./routes/auth-route/auth-route");


//middlewares
app.use(cors());
app.use(express.json());
// app.use(cookieParser());


//service
app.use("/product", productRoute);
app.use("/auth", authRoute)

// not found
app.use(notFound);

// error
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server on", port));

console.log(port);

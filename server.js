//import
const express = require('express');
const app = express();
const cors = require('cors');
const productRoute = require('./routes/product-route/product-route')

//middlewares
app.use(cors())
app.use(express.json());

//service
app.use('/product', productRoute)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server on", port));
<<<<<<< HEAD
=======

console.log(port);
console.log("Mix");
console.log("Max");
console.log("Min");
console.log("lolo");
console.log("Max");
console.log("Min");
console.log("lolo");
console.log("Max");
console.log("Min");
console.log("lolo");
>>>>>>> 0568186f19600112e907f942a0198f66c23f53f6

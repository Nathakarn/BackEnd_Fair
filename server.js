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

console.log(port);
<<<<<<< HEAD
console.log('q');
console.log('k');
=======
console.log("Mix");
>>>>>>> e8ab91af28f8558288da3db924276172f6c4eb66

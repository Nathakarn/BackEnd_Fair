const productRoute = require('../../routes/product-route/product-route')


module.exports.createProduct = (async (req,res,next) => {
    try {
        // Add your product creation logic here
        res.json({ msg: 'create Product done' });
    } catch (error) {
        next(error);
    }
  })
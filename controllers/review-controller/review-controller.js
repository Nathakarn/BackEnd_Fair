const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");


const prisma = require('../../models')
const tryCatch = require('../../utils/tryCatch')


module.exports.createReview = tryCatch(async(req ,res) =>  {
    const {user_id, order_id, product_id, rating, content } = req.body;

    const userID = parseInt(user_id, 10)
    const orderID = parseInt(order_id, 10)
    const productID = parseInt(product_id, 10)
    const ratingInt = parseInt(rating, 10)

    const rs = await prisma.review.create({
        data : {
            user_id : userID,
            order_id : orderID,
            product_id : productID,
            rating : ratingInt,
            content
        }
    })
    // res.status(200).json(req.body)
    res.json({result : rs})
})

module.exports.getReview = tryCatch(async(req ,res) =>  {
    // const { product_id } = req.query;
    // const { id } = req.params;
    const product_id = req.params.id
    const review = await prisma.review.findMany({
        where : { product_id : Number(product_id)} 
    })
    res.json(review)
    // res.json(product_id)
})

module.exports.updateReview = tryCatch(async(req ,res) =>  {
    const review_id = req.params.id;
    const { user_id, order_id, product_id, rating, content } = req.body;

    const rs = await prisma.review.update({
        where : {review_id : Number(review_id)},
        data : {
            content,
            rating,
            user_id,
            product_id,
            order_id
        }
    })
    // res.json({ msg: 'update review done' });
    res.json({result : rs})
})

module.exports.deleteReview = tryCatch(async(req ,res) =>  {
    const review_id = req.params.id;

    const rs = await prisma.review.delete({
      where : {review_id: Number(review_id)}
    })
    res.json({result: rs})
})
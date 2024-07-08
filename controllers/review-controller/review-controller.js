// const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");


// ******************* ยังไม่มีตัวจัดการ Error ********************** //


module.exports.createReview = tryCatch(async(req ,res) =>  {
    const {user_id, order, order_id, product_id, rating, content } = req.body;

    const rs = await prisma.review.create({
        data : {
            content,
            rating,
            user_id,
            product_id,
            order,
            order_id
        }
    })
    res.json({result : rs})
})

module.exports.getReview = tryCatch(async(req ,res) =>  {
    const { product_id } = req.params;
    const review = await prisma.review.findMany({
        where : { product_id : Number(product_id)}
    })
    res.json({review})
})

module.exports.updateReview = tryCatch(async(req ,res) =>  {
    const {review_id} = req.params;
    const { username, user_id, order, order_id, product_id, rating, content } = req.body;

    const rs = await prisma.review.update({
        data : {
            content,
            rating,
            user_id,
            product_id,
            order,
            order_id
        }
    })
    res.json({result : rs})
})

module.exports.deleteReview = tryCatch(async(req ,res) =>  {
    const {review_id} = req.params

    const rs = await prisma.review.delete({
      where : {review_id: Number(review+id)}
    })
    res.json({result: rs})
})
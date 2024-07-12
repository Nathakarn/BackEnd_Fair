// const { Prisma } = require("@prisma/client/edge");
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.getallAddress = tryCatch(async (req, res) => {
  const addresses = await prisma.address.findMany({
    select: {
      address_id: true,
      name: true,
      address: true,
      province: true,
      district: true,
      code: true,
      phone: true,
      email: true
    }
  });

  if (addresses.length === 0) {
    throw customError("Address not found.", 404);
  }

  res.status(200).json(addresses);
});



module.exports.createAddress = tryCatch(async (req, res) => {
  const { name, address, province, district, code, phone, email } = req.body;

  const rs = await prisma.address.create({
    data: {
      name,
      address,
      province,
      district,
      code,
      phone,
      email
    }
  })
  res.json({ result: rs })
})



module.exports.updateAddress = tryCatch(async (req, res) => {
  const { id } = req.params
  const { name, address, province, district, code, phone, email} = req.body;

  const rs = await prisma.address.update({
    where: { address_id: Number(id) },
    data: {
      name,
      address,
      province,
      district,
      code,
      phone,
      email
    }
  })
  res.json({ result: rs })
})


module.exports.deleteAddress = tryCatch(async(req,res,next) =>{
  const {id} = req.params

  const rs = await prisma.address.delete({
    where: { address_id: Number(id) }  
  })
  res.json({result: rs})
})







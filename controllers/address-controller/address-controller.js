// const { Prisma } = require("@prisma/client/edge");
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.getallAddress = tryCatch(async (req, res) => {


  const rs = await prisma.address.findMany({
    select: {
      address_id: true,
      name: true,
      address: true,
      province: true,
      district: true,
      phone: true,
      email: true
    }
  });

  if (rs.length === 0) {
    throw customError("Address not found.", 401);
  }

  res.status(201).json(rs);
});

module.exports.createAddress = tryCatch(async (req, res) => {
  const { name, address, province, district, phone, email } = req.body;

  if (!(name && address && province && district && phone && email)) {
    throw customError("Please complete all input fields.", 402);
  }

  const rs = await prisma.address.create({
    data: {
      name, address, province, district, phone, email
    }
  })

  res.status(202).json({ message: "Create Successfully" });
});

module.exports.updateAddress = tryCatch(async (req, res) => {
  const { id } = req.params
  const { name, address, province, district, phone, email } = req.body

  if (!id || !(name || address || province || district || phone || email)) {
    throw customError("Please provide a valid ID and at least one field to update.", 403);
  }

  const rs = await prisma.address.update({
    where: { address_id: Number(id) },
    data: {
      name,
      address,
      province,
      district,
      phone,
      email,
    }
  })
  res.status(203).json({ message: "Update Successfully" });

})

module.exports.deleteAddress = tryCatch(async (req,res) =>{
  const {id} = req.params

  if (!id) {
    return next(customError("ID is required.", 404));
  }

  const rs = await prisma.address.delete({
    where: { address_id: Number(id) }
  })
  res.status(204).json({ message: "Delete Successfully" });
})

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

  if (!(name && address && province && district && code && phone && email)) {
    throw customError("Please complete all input fields.", 402);
  }

  try {
    const newAddress = await prisma.address.create({
      data: {
        name, 
        address, 
        province, 
        district, 
        code, 
        phone, 
        email
      }
    });

    res.status(202).json({ message: "Create Successfully", address: newAddress });
  } catch (error) {
    console.error(error);
    throw customError("Error creating address", 500);
  }
});

module.exports.updateAddress = tryCatch(async (req, res) => {
  const { address_id } = req.params;
  const { name, address, province, district, code, phone, email } = req.body;

  if (!address_id) {
    throw customError("Please provide a valid ID.", 400);
  }

  const data = {};
  if (name) data.name = name;
  if (address) data.address = address;
  if (province) data.province = province;
  if (district) data.district = district;
  if (code) data.code = code;
  if (phone) data.phone = phone;
  if (email) data.email = email;

  if (Object.keys(data).length === 0) {
    throw customError("Please provide at least one field to update.", 400);
  }

  try {
    const rs = await prisma.address.update({
      where: { address_id: Number(address_id) },
      data
    });

    res.status(202).json({ message: "Update Successfully", data: rs });
  } catch (error) {
    throw customError("Failed to update address.", 500);
  }
});

module.exports.deleteAddress = tryCatch(async (req, res, next) => {
  const { address_id } = req.params;

  if (!address_id) {
    console.error("ID is required.");
    return next(customError("ID is required.", 400));
  }

  try {
    await prisma.address.delete({
      where: { address_id: Number(address_id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).send({ error: "Error deleting address" });
  }
});




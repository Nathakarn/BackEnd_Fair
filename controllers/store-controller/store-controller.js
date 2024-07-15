const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.createStore = tryCatch(async (req, res, next) => {
  const {
    opening_date,
    store_name,
    store_description,
    store_profilepic,
    store_cover,
    user_id,
    product_id
  } = req.body;
 
  // Convert opening_date from DD/MM/YYYY to ISO-8601 format
  const [day, month, year] = opening_date.split('/');
  const formattedOpeningDate = new Date(`${year}-${month}-${day}`).toISOString();

  // validation
  try {
    const rs = await prisma.store.create({
      data: {
        opening_date: formattedOpeningDate,
        store_name,
        store_description,
        store_profilepic,
        store_cover,
        user_id,
        product_id
      },
    });
    res.json({ msg: 'Store created successfully', result: rs });
  } catch (error) {
    console.error('Error creating store', error); // Log detailed error information
    if (error.code === 'P2002') { // Prisma unique constraint violation error code
      res.status(400).json({ error: `A store with the name '${store_name}' already exists.` });
    } else {
      next(error); // Pass other errors to the error handler
    }
  }
});

module.exports.getStoreByUserId =tryCatch(async (req,res) =>{
  const { id } = req.params;
  const rs = await prisma.store.findMany({
    where: { user_id: Number(id) }
  });
  if (!rs) {
    return res.status(404).json({ msg: "store not found" });
  }
  res.json(rs);
});


module.exports.updateStore = tryCatch(async (req, res, net) => {
  const {
    opening_date,
    store_name,
    store_description,
    store_profilepic,
    store_cover,
  } = req.body;
  // Convert opening_date to ISO-8601 format
  const formattedOpeningDate = new Date(opening_date).toISOString();

  // validation
  const rs = await prisma.store.update({
    where: { store_id: Number(id) },
    data: {
      opening_date,
      store_name,
      store_description,
      store_profilepic,
      store_cover,
    },
  });
});

module.exports.deleteStore = tryCatch(async(req,res,next) =>{
    const {id} = req.params
  
    const rs = await prisma.store.delete({
      where: { store_id: Number(id) }  
    })
    res.json(rs)
  })
  
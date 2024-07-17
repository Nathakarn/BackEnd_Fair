const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

module.exports.createStore = tryCatch(async (req, res, next) => {
  const {
    store_name,
    store_description,
    store_profilepic,
    store_cover,
    user_id,

  } = req.body;

  try {
    const rs = await prisma.store.create({
      data: {
        store_name,
        store_description,
        store_profilepic,
        store_cover,
        user_id,

      },
    });
    res.json({ msg: 'Store created successfully', result: rs });
  } catch (error) {
    console.error('Error creating store', error);
    if (error.code === 'P2002') {
      res.status(400).json({ error: `A store with the name '${store_name}' already exists.` });
    } else {
      next(error);
    }
  }
});

module.exports.getStoreByUserId = tryCatch(async (req, res) => {
  const { id } = req.params;
  const rs = await prisma.store.findMany({
    where: { user_id: parseInt(id, 10) }
  });
  if (!rs.length) {
    return res.status(404).json({ msg: "Store not found" });
  }
  res.json(rs);
});

module.exports.updateStore = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const {
    store_name,
    store_description,
    store_profilepic,
    store_cover,
  } = req.body;

  try {
    const rs = await prisma.store.update({
      where: { store_id: parseInt(id, 10) },
      data: {
        store_name,
        store_description,
        store_profilepic,
        store_cover,
      },
    });
    res.json({ msg: 'Store updated successfully', result: rs });
  } catch (error) {
    console.error('Error updating store', error);
    next(error);
  }
});

module.exports.deleteStore = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await prisma.store.delete({
      where: { store_id: Number(id) }
    });
    res.json({ msg: 'Store deleted successfully', result: rs });
  } catch (error) {
    console.error('Error deleting store', error);
    next(error);
  }
});

module.exports.getAllStores = async (req, res, next) => {
  try {
    const stores = await prisma.store.findMany();
    res.json(stores);
  } catch (error) {
    console.error('Error fetching all stores', error);
    next(error);
  }
};
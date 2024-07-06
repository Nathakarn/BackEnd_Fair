const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

const createMessage = async (data) => {
  try {
    const newMessage = await prisma.message.create({
      data,
    });
    return newMessage;
  } catch (error) {
    console.error("Error creating message: ", error);
    throw customError("Failed to create message!", 400);
  }
};

const populateMessage = async (id) => {
  try {
    const msg = await prisma.message.findUnique({
      where: { id },
      include: {
        sender: {
          select: {
            name: true,
            picture: true,
          },
        },
        conversation: {
          include: {
            users: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    picture: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!msg) throw createHttpError.BadRequest("Oops...Something went wrong!");
    return msg;
  } catch (error) {
    console.error("Error populating message: ", error);
    throw createHttpError.BadRequest("Failed to populate message!");
  }
};

module.exports = {
  createMessage,
  populateMessage,
};

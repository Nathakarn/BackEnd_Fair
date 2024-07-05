const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const doesConversationExist = async (sender_id, receiver_id) => {
  const convos = await prisma.conversation.findMany({
    where: {
      isGroup: false,
      AND: [
        {
          users: {
            some: {
              userId: parseInt(sender_id),
            },
          },
        },
        {
          users: {
            some: {
              userId: parseInt(receiver_id),
            },
          },
        },
      ],
    },
    include: {
      users: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      },
      latestMessage: {
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              picture: true,
              status: true,
            },
          },
        },
      },
    },
  });

  // console.log(convos);

  // if (!convos.length) {
  //   throw customError("Something went wrong in doesConversationExist", 400);
  // }

  return convos[0];
};

const createConversation = async (data) => {
  const { senderId, receiverId, name, picture, isGroup } = data;

  // check senderId and receiverId data
  if (!senderId || !receiverId) {
    throw customError("senderId or receiverId is missing", 400);
  }

  try {
    const newConvo = await prisma.$transaction(async (prisma) => {
      const conversation = await prisma.conversation.create({
        data: {
          name,
          picture,
          isGroup,
          users: {
            create: [
              { user: { connect: { id: senderId } } },
              { user: { connect: { id: receiverId } } },
            ],
          },
        },
        include: {
          users: true,
          latestMessage: true,
        },
      });

      return conversation;
    });

    if (!newConvo) {
      throw customError("Something went wrong in createConversation", 400);
    }

    return newConvo;
  } catch (error) {
    console.log("Error creating conversation:", error);
    throw error;
  }
};

const populateConversation = async (id, include) => {
  const populatedConvo = await prisma.conversation.findUnique({
    where: { id },
    include,
  });
  if (!populatedConvo) {
    throw customError("Oops...Something went wrong populateConversation", 400);
  }
  return populatedConvo;
};

const getUserConversations = async (user_id) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          id: user_id,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          picture: true,
          email: true,
          status: true,
        },
      },
      admin: {
        select: {
          id: true,
          name: true,
          picture: true,
          email: true,
          status: true,
        },
      },
      latestMessage: {
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              picture: true,
              status: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (!conversations.length)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  return conversations;
};

const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await prisma.conversation.update({
    where: { id: convo_id },
    data: { latestMessage: { connect: { id: msg.id } } },
  });
  if (!updatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  return updatedConvo;
};

module.exports = {
  doesConversationExist,
  createConversation,
  populateConversation,
};

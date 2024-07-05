const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");
const { doesConversationExist } = require("../../services/chatApp/conversation.service");

module.exports.create_open_conversation = tryCatch(async (req, res, next) => {
  const sender_id = 1; //ปิดรอ auth
  const { receiver_id } = req.body;
  //check if receiver_id is provided
  if (!receiver_id) {
    throw customError(
      "please provide the user id you wanna start a conversation with !",
      400
    );
  }

  //check if chat exists
  // if  exists get data
  const existed_conversation = await doesConversationExist(
    sender_id,
    receiver_id
  );
  if (existed_conversation) {
    res.json(existed_conversation);
  } else {
    console.log("not fould conversation")
    // let receiver_user = await findUser(receiver_id);
    // let convoData = {
    //   name: receiver_user.name,
    //   picture: receiver_user.picture,
    //   isGroup: false,
    //   users: { connect: [{ id: sender_id }, { id: receiver_id }] },
    // };
    // const newConvo = await createConversation(convoData);
    // const populatedConvo = await populateConversation(newConvo.id, {
    //   users: true,
    //   latestMessage: { include: { sender: true } },
    // });
    // res.status(200).json(populatedConvo);
  }
});

import Chat from '../models/Chat.model.js'; 

// Create a new chat or append a message to an existing chat
export const createOrUpdateChat = async (req, res) => {
  try {
    const { participants, messages, groupName, groupAvatar } = req.body;

    // Find a chat with the same participants
    let chat = await Chat.findOne({
      participants: { $all: participants, $size: participants.length }
    });

    if (chat) {
      // Chat found, append the message
      chat.messages.push(...messages);
    } else {
      // Chat not found, create a new chat
      chat = new Chat({ participants, messages, groupName, groupAvatar });
    }

    await chat.save();
    res.status(201).send(chat);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all chats
export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('participants').populate('messages.sender');
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all chats related to a specific user ID
export const getChatsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ participants: userId })
      .populate({ path: 'participants', select: '-password' })
      .populate({ path: 'messages.sender', select: '-password' });
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all messages for a specific chat ID and user ID
export const getMessagesByChatId = async (req, res) => {
  try {
    const { id, chatid } = req.params;
    const chat = await Chat.findOne({ _id: chatid, participants: id })
      .populate({ path: 'messages.sender', select: '-password' });

    if (!chat) {
      return res.status(404).send({ message: 'Chat not found or user not a participant' });
    }

    res.status(200).send(chat.messages);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add a message to a specific chat ID
export const addMessageToChat = async (req, res) => {
  try {
    const { id, chatid } = req.params;
    const { sender, contentType, content, fileUrl } = req.body;

    // Create new message object
    const newMessage = {
      sender,
      contentType,
      content,
      fileUrl,
      timestamp: new Date()
    };

    // Find the chat and update it by pushing the new message
    const chat = await Chat.findOneAndUpdate(
      { _id: chatid, participants: id },
      { $push: { messages: newMessage } },
      { new: true }
    ).populate({ path: 'messages.sender', select: '-password' });

    if (!chat) {
      return res.status(404).send({ message: 'Chat not found or user not a participant' });
    }

    res.status(201).send(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};

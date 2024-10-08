// src/features/chats/chatsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Layout/api";

// Define the initial state for chats
const initialState = {
  currentChatId: null,
  userChats: [],
  selectedUserDetail: {},
  messages: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch user chats
export const fetchUserChats = createAsyncThunk(
  "chats/fetchUserChats",
  async (id) => {
    const response = await api.get(`/chats/user/${id}`);
    return { data: response.data, userId: id };
  }
);

// Async thunk to fetch user chats messages
export const fetchChatMsgs = createAsyncThunk(
  "chats/fetchChatMsgs",
  async ({ userId, chatId }) => {
    const response = await api.get(`/chats/user/${userId}/${chatId}`);
    return { data: response.data };
  }
);

// Async thunk to send message to user chats
export const sendUserChat = createAsyncThunk(
  "chats/sendUserChat",
  async ({ userId, chatId, message }) => {
    const response = await api.post(`/chats/user/${userId}/${chatId}`, {
      sender: userId, // Ensure the data format matches the server expectation
      content: message,
    });
    return { data: response.data, chatId, userId };
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setMessageselectedUserDetail: (state, action) => {
      state.selectedUserDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userChats = action.payload.data.map((chat) => {
          const lastMessageIndex = chat.messages.length - 1;
          const lastmsg =
            chat.messages[lastMessageIndex]?.content || "No messages yet";
          const lastmsgTime =
            chat.messages[lastMessageIndex]?.timestamp || new Date();

          const filteredChat = {};
          filteredChat.participants = chat.participants.filter(
            (userData) => userData._id !== action.payload.userId // Use userId from action.payload
          );
          filteredChat.lastmsg = lastmsg;
          filteredChat.chat_id = chat._id;
          filteredChat.lastmsgTime = lastmsgTime;
          filteredChat.typeGroup = chat.typeGroup;
          if (filteredChat.typeGroup) {
            filteredChat.groupAvatar = chat.groupAvatar;
            filteredChat.groupName = chat.groupName;
          }
          return filteredChat;
        });
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchChatMsgs.fulfilled, (state, action) => {
        state.status = "successed";
        state.messages = action.payload.data;
        // console.log(action.payload.data);
      });
  },
});

export const { setCurrentChatId, setMessageselectedUserDetail } =
  chatsSlice.actions;

export default chatsSlice.reducer;

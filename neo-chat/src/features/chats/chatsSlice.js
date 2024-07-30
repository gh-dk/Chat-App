// src/features/chats/chatsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../Layout/api';

// Define the initial state for chats
const initialState = {
  userChats: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch user chats
export const fetchUserChats = createAsyncThunk(
  'chats/fetchUserChats',
  async (id) => {
    const response = await api.get(`/chats/user/${id}`);
    return { data: response.data, userId: id }; // Return both data and userId
  }
);

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userChats = action.payload.data.map((chat) => {
          const lastMessageIndex = chat.messages.length - 1;
          const lastmsg = chat.messages[lastMessageIndex]?.content || "No messages yet";
          const lastmsgTime = chat.messages[lastMessageIndex]?.timestamp || new Date();

          const filteredChat = {};
          filteredChat.participants = chat.participants.filter(
            (userData) => userData._id !== action.payload.userId // Use userId from action.payload
          );
          filteredChat.lastmsg = lastmsg;
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
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chatsSlice.reducer;

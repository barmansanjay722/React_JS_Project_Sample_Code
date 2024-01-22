import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
// global state
const initialState = {
  customerId: null,
  token: null,
  authCode: null,
  userId: null,
  appcode: null,
  authUrl: null,
  showModal: false,
  webSocketSession: null,
  webuserId: null,
  actId: null,
  adminToken: null
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  // modifying global state
  reducers: {
    setLogin: (state, action) => {
      
      state.customerId = jwtDecode(action.payload.token).sub;
      state.token = action.payload.token;
    },

    setAdminLogin: (state, action) => {
      state.adminToken = action.payload.adminToken;
    },

    setLogout: (state) => {
      state.customerId = null;
      state.token = null;
      state.authCode = null;
      state.userId = null;
      state.appcode = null;
      state.authUrl = null;
      state.webSocketSession = null;
      state.actId = null;
      state.webuserId =null;
      state.adminToken= null
    },

    setSession: (state, action) => {
      state.authCode = action.payload.authCode;
      state.userId = action.payload.userId;
      state.appcode = action.payload.appcode;
    },

    setAuthUrl: (state,action) => {
      state.authUrl = action.payload.authUrl;
    },
    
    setModal: (state,action) => {
      state.showModal = action.payload.showModal;
    },
    setWebSocketSession: (state,action) => {
      state.webSocketSession = action.payload.webSocketSession;
      state.actId = action.payload.actId;
      state.webuserId = action.payload.webuserId;
    }
  },
});

export const { setLogin, setLogout, setSession, setAuthUrl, setModal, setWebSocketSession, setAdminLogin} = authSlice.actions;
export default authSlice.reducer;

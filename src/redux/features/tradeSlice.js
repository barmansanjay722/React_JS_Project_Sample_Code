import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTradeList } from "../../services/tradeService";

const initialState = {
  autoTradeList: [],
  tradeData: null,
  total: 0,
  tradeListLoader: false,
};

export const getTradeList = createAsyncThunk(
  "strategy/getTradeList",
  async ({ limit, offset }) => {
    const res = await fetchTradeList(limit, offset);
    if (res?.hasOwnProperty("response")) {
      return false;
    } else {
      return res.data;
      }
      
    }
  
);

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setInitTrade: (state) => {
      state.autoTradeList = [];
      state.tradeData = null;
      state.tradeListLoader = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTradeList.pending, (state, action) => {
      if (state.autoTradeList.length === 0) {
        state.tradeListLoader = true;
      }
    });

    builder.addCase(getTradeList.fulfilled, (state, action) => {
      if (action?.payload === false) {
        return { ...state, tradeListLoader: false, autoTradeList: [] };
      } else {
        return {
          ...state,
          autoTradeList: [...action.payload.result],
          tradeListLoader: false,
          tradeData: action.payload.total
        };
      }
    });
  },
});

const { reducer } = tradeSlice;
export const { setInitTrade } = tradeSlice.actions;
export default reducer;

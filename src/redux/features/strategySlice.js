import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStrategyDetails } from "../../services/strategyService";

const initialState = {
  strategyList: [],
};

export const getStrategyList = createAsyncThunk(
  "strategy/getStrategyList",
  async ({ limit, offset }) => {
    const res = await fetchStrategyDetails(limit, offset);
    return res.data;
  }
);

const strategySlice = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setInitStrategy: (state) => {
      state.strategyList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStrategyList.fulfilled, (state, action) => {
      return { ...state, strategyList: [...action.payload] };
    });
  },
});

const { reducer } = strategySlice;
export const { setInitStrategy } = strategySlice.actions;
export default reducer;

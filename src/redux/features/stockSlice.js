import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchHoldings,
  fetchOrder,
  fetchWatchList,
  fetchPosition,
  fetchStocks,
} from "../../services/stockService";

const initialState = {
  watchlist: [],
  orders: [],
  positions: [],
  holdings: [],
  watchListStocks: [],
  watchlistloader: false,
  orderListLoader: false,
  positionListLoader: false,
  holdingListLoader: false,
};

export const getWatchList = createAsyncThunk("stock/getWatchList", async () => {
  const res = await fetchWatchList();
  if (res?.hasOwnProperty("response")) {
    return false;
  } else {
    return res.data;
  }
});

export const getHoldingsList = createAsyncThunk(
  "stock/getHoldingsList",
  async () => {
    const res = await fetchHoldings();
    if (res?.hasOwnProperty("response")) {
      return false;
    } else {
      return res.data;
    }
  }
);

export const getOrderList = createAsyncThunk(
  "stock/getOrderList",
  async (type) => {
    const res = await fetchOrder(type);
    if (res?.hasOwnProperty("response")) {
      return false;
    } else {
      return res.data;
    }
  }
);

export const getPositionList = createAsyncThunk(
  "stock/getPositionList",
  async () => {
    const res = await fetchPosition();
    if (res?.hasOwnProperty("response")) {
      return false;
    } else {
      return res.data;
    }
  }
);

export const getStockList = createAsyncThunk(
  "stock/getStockList",
  async ({ searchValue, exchangeValue }) => {
    const res = await fetchStocks(searchValue, exchangeValue);
    return res.data;
  }
);


const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setInitStocks: (state) => {
      state.watchlist = [];
      state.orders = [];
      state.positions = [];
      state.holdings = [];
      state.watchListStocks = [];
      state.watchlistloader = false;
      state.orderListLoader = false;
      state.positionListLoader = false;
      state.holdingListLoader = false;
    },
    setOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWatchList.pending, (state, action) => {
      if (state.watchlist.length === 0) {
        state.watchlistloader = true;
      }
    });

    builder.addCase(getWatchList.fulfilled, (state, action) => {
      if (action?.payload === false) {
        return { ...state, watchlistloader: false, watchlist: [] };
      } else {
        return {
          ...state,
          watchlist: [...action.payload],
          watchlistloader: false,
        };
      }
    });

    builder.addCase(getHoldingsList.pending, (state, action) => {
      if (state.holdings.length === 0) {
        state.holdingListLoader = true;
      }
    });

    builder.addCase(getHoldingsList.fulfilled, (state, action) => {
      if (action?.payload === false) {
        return { ...state, holdingListLoader: false, holdings: [] };
      } else {
        return {
          ...state,
          holdings: [...action.payload],
          holdingListLoader: false,
        };
      }
    });

    builder.addCase(getOrderList.pending, (state, action) => {
      state.orderListLoader = true;
    });
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      if (action?.payload === false) {
        return { ...state, orderListLoader: false, orders: [] };
      } else {
        return {
          ...state,
          orders: [...action.payload],
          orderListLoader: false,
        };
      }
    });
    builder.addCase(getPositionList.pending, (state, action) => {
      if (state.positions.length === 0) {
        state.positionListLoader = true;
      }
    });
    builder.addCase(getPositionList.fulfilled, (state, action) => {
      if (action?.payload === false) {
        return { ...state, positionListLoader: false, positions: [] };
      }
      return {
        ...state,
        positions: [...action.payload],
        positionListLoader: false,
      };
    });

    builder.addCase(getStockList.fulfilled, (state, action) => {
      return { ...state, watchListStocks: [...action.payload] };
    }); 
  },
});

const { reducer } = stockSlice;
export const { setInitStocks, setOrders } = stockSlice.actions;
export default reducer;

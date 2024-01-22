import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStrategyAll } from "../../services/strategyService";

const initialState = {
    strategyAllList: [],
    strategyData: null,
    total: 0,
    strategyListLoader: false,
};
  
export const getStrategyListData = createAsyncThunk("strategy/getStrategyListData", async ({ limit, offset,strategyName,strategyStatus,createdOnStartDate,createdOnEndDate }) => {
    const res = await fetchStrategyAll(limit, offset, strategyName, strategyStatus,createdOnStartDate,createdOnEndDate);
    if (res?.hasOwnProperty("response")) {
        return false;
    } else {
        
        return res.data;
        
    }
});

const strategyAdminSlice = createSlice({
    name: "strategyAll",
    initialState,
    reducers: {
        setInitStrategyAll: (state) => {
          state.strategyAllList = [];
          state.strategyData = null;
          state.strategyListLoader = false;
        },
      },
      extraReducers: (builder) => {
        builder.addCase(getStrategyListData.pending, (state, action) => {
          if (state.strategyAllList.length === 0) {
            state.strategyListLoader = true;
          }
        });
        builder.addCase(getStrategyListData.fulfilled, (state, action) => {
            if (action?.payload === false) {
               
              return { ...state, strategyListLoader: false, strategyAllList: [] };
            } else {
              return {
                ...state,
                strategyAllList: [...action.payload.result],
                strategyListLoader: false,
                strategyData : action.payload.total,
                
              };
            }
          });
        },
      });


//     name: "strategyAdminSlice",
//     initialState,
   
//     extraReducers: (builder) => {
//         builder.addCase(getStrategyListData.fulfilled, (state, action) => {
//           console.log(action.payload);
//             return {
//                 ...state,
//                 autostrategyAllList: [...action.payload.result],

//                 total: action.payload.total,
//             };
//         });
//     },
// });

const { reducer } = strategyAdminSlice;
export const { setInitStrategyAll } = strategyAdminSlice.actions;
export default reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCustomerList } from "../../services/dashboardService";

const initialState = {
    customerList: [],
    customerData: null,
    total: 0,
    customerListLoader: false,
};

export const getCustomerList = createAsyncThunk("customer/getCustomerList", async ({ limit, offset, customerName, customerType, customerStatus, customerPayment, customerRenewalStartDate, customerRenewalEndDate, customerLastActiveStartDate, customerLastActiveEndDate }) => {
    const res = await fetchCustomerList(limit, offset, customerName, customerType, customerStatus, customerPayment, customerRenewalStartDate, customerRenewalEndDate, customerLastActiveStartDate, customerLastActiveEndDate);
    if (res?.hasOwnProperty("response")) {
        return false;
    } else {
        return res.data;
    }
});

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setInitCustomer: (state) => {
            state.customerList = [];
            state.customerData = null;
            state.customerListLoader = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomerList.pending, (state, action) => {
            if (state.customerList.length === 0) {
                state.customerListLoader = true;
            }
        });
        builder.addCase(getCustomerList.fulfilled, (state, action) => {
            if (action?.payload === false) {
                return { ...state, customerListLoader: false, customerList: [] };
            } else {
                return {
                    ...state,
                    customerList: [...action.payload.result],
                    customerListLoader: false,
                    customerData: action.payload.total,
                };
            }
        });
    },
});

const { reducer } = customerSlice;
export const { setInitCustomer } = customerSlice.actions;
export default reducer;

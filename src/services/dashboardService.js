import axios from "axios";
import { useEffect, useState } from "react";
import { errorToast } from "../component/Toasts/Toasts";
import store from "../redux";
const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use((req) => {
  const token = store.getState().auth.adminToken;

  token && (req.headers.Authorization = `Bearer ${token}`);
  return req;
});

const UseFetch = (endPoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // function definition
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get(endPoint);
        setData(data);
      } catch (error) {
        if (error.response.status === 401) {
          setData("401");
        }
      }
      setLoading(false);
    }

    fetchData();
  }, [endPoint]);

  return { data, loading };
};

// get request

export const getAdminSummary = () => UseFetch("admin/dashboard");
export const getInactiveUserData = ({limit,offset}) => UseFetch(`customer/inactiveUser?limit=${limit}&offset=${offset}`) ;

export const fetchCustomerList = async (limit,offset,customername,customertype,customerstatus,customerpayment,customerrenewalstartdate, customerrenewalenddate, customerlastactivestartdate, customerlastactiveenddate) => {
  try {
    const response = await api.get(`/customer/management?limit=${limit}&offset=${offset}&name=${customername}&userType=${customertype}&status=${customerstatus}&paymentStatus=${customerpayment}&lastActiveStartDate=${customerlastactivestartdate}&lastActiveEndDate=${customerlastactiveenddate}&renewalStartDate=${customerrenewalstartdate}&renewalEndDate=${customerrenewalenddate}`);
    return response;
  } catch (error) {
    return error;
  }
};

// export const getInvoice = ({id}) => UseFetch(`/customer/${id}/invoice`);
export const getReport = ({limit,offset}) => UseFetch(`/reports/renewal?limit=${limit}&offset=${offset}`);
export const getRegistrationReport = ({limit,offset}) => UseFetch(`reports/registration?limit=${limit}&offset=${offset}`);
export const getTradesReport = ({limit,offset})=> UseFetch(`reports/trades?limit=${limit}&offset=${offset}`);
export const getStrategyReport = ({limit,offset})=> UseFetch(`/reports/strategy?limit=${limit}&offset=${offset}`);

export const deleteCustomer = async (id) => {
  try {
    const response = await api.delete(`/customer/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const getInvoiceCustomer = async (id) =>{
  try {
    const response = await api.get(`/customer/${id}/invoice`, {responseType: "arraybuffer"});
    return response;
  } catch (error) {
    return error;
  }
}


// post Request

export const modifyCustomerStatus = async (id, type) => {
  try {
    const response = await api.post(`/customer/${id}/${type}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const getChartData = async (data) => {
  try {
    const response = await api.post("/customer/activeUser/history", data);
    return response;
  } catch (error) {
    return error;
  }
};


export const userLogout = async () => {
  try {
    await api.post("/logout");
    return true;
  } catch (error) {
    errorToast("Something went wrong");
    return false;
  }
};

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (er.response) {
      if (er.response.status === 401) {
        window.location.href = "/app/logout";
        
      }
    }

    return Promise.reject(er);
  }
);

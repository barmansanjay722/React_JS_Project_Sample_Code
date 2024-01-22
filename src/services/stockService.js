import { useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../component/Toasts/Toasts";
import store from "../redux";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use((req) => {
  const token = store.getState().auth.token;

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

// GET Requests

export const getWebSocket = () => UseFetch("/websocket");

export const getWatchList = () => UseFetch("/watchList");

// export const getPortfollioList = () => UseFetch("/order/portfolio/LIVE");
// export const getPortfollioList = async (type) => {
//   try {
//     const response = await api.get(`/order/portfolio/${type}`);
//     return response;
//   }
//   catch(error)
//   {
//     return error;
//   }
// }
 export const getPortfollioList = () => UseFetch(`/order/portfolio`);

export const fetchStocks = async (value, exchangeData, instrumentData) => {

  const response = await api.get(
    `/instruments?search=${value}&instrumentType=${instrumentData}&exchange=${exchangeData}&limit=10`
  );
  return response;
};

export const fetchWatchList = async () => {
  try {
    const response = await api.get("/watchList");
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchHoldings = async () => {
  try {
    const response = await api.get("/order/holdings");
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchOrder = async (type) => {
  try {
    const response = await api.get(`/order/book?type=${type}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchTradeBook = async () => {
  try {
    const response = await api.get("/order/");
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchPosition = async () => {
  try {
    const response = await api.get("/order/positions");
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchTradeSetup = async () => {
  try {
    const response = await api.get("/trades");
    return response;
  } catch (error) {
    return error;
  }
};

// POST Requests...
export const placeOrder = async (data) => {
  try {
    const response = await api.post("/order/place", data);
    return response;
  } catch (error) {
    // errorToast("Something went wrong");
    // return false;
    return error;
  }
};

//POST Requests...
export const saveWatchList = async (data) => {
  try {
    const response = await api.post("/watchList", data);
    return response;
  } catch (error) {
    errorToast("Something went wrong");
    return false;
  }
};

//POST Requests...
export const removeWatchList = async (data) => {
  try {
    const response = await api.post("/watchList/remove", data);
    return response;
  } catch (error) {
    errorToast("Something went wrong");
    return false;
  }
};

//post requests...

export const cancleOrder = async (data) => {
  try {
    const response = await api.post("/order/cancel", data);
    return response;
  } catch (error) {
    errorToast(error.response.data === null ? "Something went wrong" : error.response.data.errorMessage);
    return false;
  }
};

// post request....
export const TradeInfo = async (data) => {
  try {
    const response = await api.post("/trade", data);
    return response;
  } catch {
    errorToast("Something went wrong");
    return false;
  }
};

// post request....
export const squareOffInfo = async (data) => {
  try {
    const response = await api.post("/order/squareOffAll", data);
    return response;
  } catch {
    errorToast("Something went wrong");
    return false;
  }
};

export const positionSellOff = async (data) => {
  try {
    const response = await api.post("/order/squareOff", data);
    return response;
  } catch {
    errorToast("Something went wrong");
    return false;
  }
}

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
 

import axios from "axios";
import store from "../redux";
import {useState,useEffect} from "react";

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

// get request

export const getRenewalHistory = ({userId}) => UseFetch(`customer/${userId}/subscription`);


export const getRenewalHistoryInvoice = async(id) => {
  try {
       const response = await api.get(`/customer/invoice/${id}`, {responseType: "arraybuffer"});
       return response;
  }
  catch(error)
  {
   return error;
  }
}

export const getCustomerProfile = async () => {
  try {
    const response = await api.get("/customer/profile");
    return response;
  } catch (error) {
    return error;
  }
};

export const getGstInformation = async(userId)=>{
  try{
     const response = await api.get(`/customer/gst/${userId}`);
     return response;
  }
  catch(error)
  {
    return error;
  }
}


export const updateEmail = async (value) => {
  try {
    const response = await api.put("/customer/email/verify", value);
    return response;
  } catch (error) {
    return error;
  }
};
export const saveGstRecord = async (value) => {
  try {
    const response = await api.post("/customer/gst", value);
    return response;
  } catch (error) {
    return error;
  }
};
export const userIsTermsAccepted = async () => {
  try{
    const response = await api.post("/termsAccepted");
    return response;
  }catch (error) {
    return error;
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

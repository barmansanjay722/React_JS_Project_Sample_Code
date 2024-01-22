import { useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../component/Toasts/Toasts";
import store from "../redux";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use(req => {
 const token = store.getState().auth.token;

 token && (req.headers.Authorization = `Bearer ${token}`);
  return req;
});

const UseFetch = (endPoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect  (() => {
      // function definition
      const fetchData = async ()=> {
        setLoading(true);
        try {
          const {data} = await api.get(endPoint);
          setData(data);
         
        } catch (error) {
          if(error.response.status !== 404){
            errorToast("Something went wrong");
          }
        }
        setLoading(false);
      }
  
      fetchData();
    }, [endPoint]);
    return data;
  };

  export const getWebSocket =  () => UseFetch("/websocket");

  export const fetchSocketSession = async () => {
    try {
      const response = await api.get("/websocket");
      
      return response
    } catch (error) {
      if(error.response.status === 400 && error.response.data.errorCode==='BROKER_SESSION_EXPIRED') {
        return error.response.data.errorCode;
      }
      
    }
  }
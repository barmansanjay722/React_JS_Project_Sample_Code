import { useEffect, useState } from "react";
import axios from "axios";
import  store  from "../redux";
import { errorToast } from "../component/Toasts/Toasts";
const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use(req => {
  // 1st ==> get user token from Redux store, that server send to client...
const token = store.getState().auth.token;
 // 2nd ==> send this token from LocalStorage into server for user id tracking...
// & we can see it by at browser Network Console
token && (req.headers.Authorization = `Bearer ${token}`);
 return req;
});

const UseFetch = (endPoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    // function definition...
    const fetchData = async () => {
      setLoading(true);
      try {
        const {data} = await api.get(endPoint);
        setData(data);
      } catch (error) {
        errorToast("Something went wrong");
      }
      setLoading(false);
    };

    // function calling...
    fetchData();
  }, [endPoint]);

  return { data, loading };
};

// GET Requests...
export const getBrokers = (limit,offset) => UseFetch(`/brokers?limit=${3}&offset=${0}`);


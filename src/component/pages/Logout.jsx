import React, { useEffect } from "react";
import { setLogout } from "../../redux/features/authslice";
import { setInitStocks } from "../../redux/features/stockSlice";
import { useDispatch } from "react-redux";
import { setInitTrade } from "../../redux/features/tradeSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogout());
    dispatch(setInitStocks());
    dispatch(setInitTrade());
  }, []);

  return <></>;
};

export default Logout;
  
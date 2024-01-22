import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
// console.log(root);
const htmlElement=document.getElementsByTagName("html")[0];
htmlElement.setAttribute("class","no-js");
htmlElement.setAttribute("lang","en");
if("dark" === localStorage.getItem("theme"))
{
  htmlElement.setAttribute("data-theme","dark");
  localStorage.setItem("theme", "dark")
}
else{
  htmlElement.setAttribute("data-theme","light");
  localStorage.setItem("theme", "light")
}
root.render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
      <BrowserRouter basename="/app">
      {/* <BrowserRouter > */}
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

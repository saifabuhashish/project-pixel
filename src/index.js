import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./store/store";
import { Provider } from "react-redux";

const { store } = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://xmjzpo5d6gwj.usemoralis.com:2053/server"
      appId="biSHQdbmCYWOOt0EpU08hMeEE7EJOgnbty0YnvyG"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

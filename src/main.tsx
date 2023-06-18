import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import "./input.css";
import Spinner from "./components/common/spinner/Spinner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
      <RecoilRoot>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);

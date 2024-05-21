import React from "react";
import ReactDOM from "react-dom/client";
import { PaymentDataContextProvider } from "./context/PaymentDataContext";
import { DashboardPaymentDataContextProvider } from "./context/DashboardPaymentDataContext";
import { PieChartDataContextProvider } from "./context/PieChartDataContext";
import { BarChartDataContextProvider } from "./context/BarChartDataContext";
import { BarChartDataDaysContextProvider } from "./context/BarChartDataDaysContext";
import { LineChartDataContextProvider } from "./context/LineChartDataContext";
import { LineChartDataDaysContextProvider } from "./context/LineChartDataDaysContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import "dayjs/locale/en-gb";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <PaymentDataContextProvider>
            <DashboardPaymentDataContextProvider>
              <PieChartDataContextProvider>
                <BarChartDataContextProvider>
                  <BarChartDataDaysContextProvider>
                    <LineChartDataContextProvider>
                      <LineChartDataDaysContextProvider>
                        <App />
                      </LineChartDataDaysContextProvider>
                    </LineChartDataContextProvider>
                  </BarChartDataDaysContextProvider>
                </BarChartDataContextProvider>
              </PieChartDataContextProvider>
            </DashboardPaymentDataContextProvider>
          </PaymentDataContextProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </ProSidebarProvider>
  </React.StrictMode>
);

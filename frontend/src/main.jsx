import React from "react";
import ReactDOM from "react-dom/client";
import { PaymentDataContextProvider } from "./context/PaymentDataContext";
import { IncomeDataContextProvider } from "./context/IncomeDataContext";
import { DashboardPaymentDataContextProvider } from "./context/DashboardPaymentDataContext";
import { PieChartDataContextProvider } from "./context/PieChartDataContext";
import { BarChartDataContextProvider } from "./context/BarChartDataContext";
import { BarChartDataIncomeContextProvider } from "./context/BarChartDataIncomeContext";
import { BarChartDataDaysContextProvider } from "./context/BarChartDataDaysContext";
import { BarChartDataDaysIncomeContextProvider } from "./context/BarChartDataDaysIncomeContext";
import { LineChartDataContextProvider } from "./context/LineChartDataContext";
import { LineChartDataDaysContextProvider } from "./context/LineChartDataDaysContext";
import { LineChartDataIncomeContextProvider } from "./context/LineChartDataIncomeContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import "dayjs/locale/en-gb";
import { ExpensesDataContextProvider } from "./context/ExpensesDataContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <AuthContextProvider>
            <PaymentDataContextProvider>
              <UserProvider>
                <ExpensesDataContextProvider>
                  <IncomeDataContextProvider>
                    <DashboardPaymentDataContextProvider>
                      <PieChartDataContextProvider>
                        <BarChartDataContextProvider>
                          <BarChartDataDaysIncomeContextProvider>
                            <BarChartDataIncomeContextProvider>
                              <BarChartDataDaysContextProvider>
                                <LineChartDataContextProvider>
                                  <LineChartDataIncomeContextProvider>
                                    <LineChartDataDaysContextProvider>
                                      <App />
                                    </LineChartDataDaysContextProvider>
                                  </LineChartDataIncomeContextProvider>
                                </LineChartDataContextProvider>
                              </BarChartDataDaysContextProvider>
                            </BarChartDataIncomeContextProvider>
                          </BarChartDataDaysIncomeContextProvider>
                        </BarChartDataContextProvider>
                      </PieChartDataContextProvider>
                    </DashboardPaymentDataContextProvider>
                  </IncomeDataContextProvider>
                </ExpensesDataContextProvider>
              </UserProvider>
            </PaymentDataContextProvider>
          </AuthContextProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </ProSidebarProvider>
  </React.StrictMode>
);

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useMediaQuery } from "react-responsive";
import {
  Dashboard,
  Income,
  Transaction,
  Calendar,
  Bar,
  Pie,
  Line,
  Home,
  TransactionMobile,
} from "./pages";
import Charts from "./mobile/charts/Charts";
import { SideBar, TopBar, BottomBar } from "./navigationbar";
import AddPaymentModal from "./utils/AddPaymentModal";
import AddSavingModal from "./utils/AddSavingModal";
import Savings from "./pages/savings/Savings";

const App = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openSavingModal, setOpenSavingModal] = useState(false);

  const handleOpenPaymentModal = () => setOpenPaymentModal(true);
  const handleClosePaymentModal = () => setOpenPaymentModal(false);

  const handleOpenSavingModal = () => setOpenSavingModal(true);
  const handleCloseSavingModal = () => setOpenSavingModal(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 398px)",
  });

  const { isLogged } = useAuth();

  return (
    <>
      <AddPaymentModal
        open={openPaymentModal}
        onClose={handleClosePaymentModal}
      />
      <AddSavingModal open={openSavingModal} onClose={handleCloseSavingModal} />
      <div className="app">
        {isDesktopOrLaptop && isLogged && <SideBar />}
        <main className="content">
          {isLogged && (
            <TopBar
              openPaymentModal={handleOpenPaymentModal}
              openSavingsModal={handleOpenSavingModal}
            />
          )}
          <Routes>
            {!isLogged ? (
              <Route path="/" element={<Home />} />
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <Dashboard
                      openPaymentModal={handleOpenPaymentModal}
                      openSavingsModal={handleOpenSavingModal}
                    />
                  }
                />
                <Route path="/home" element={<Home />} />
                <Route path="transaction" element={<Transaction />} />
                <Route
                  path="transactionMobile"
                  element={<TransactionMobile />}
                />
                <Route path="income" element={<Income />} />
                <Route path="savings" element={<Savings />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="charts" element={<Charts />} />
                <Route path="bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="line" element={<Line />} />
              </>
            )}
          </Routes>
          {isDesktopOrLaptop || (isLogged && <BottomBar />)}
        </main>
      </div>
    </>
  );
};

export default App;

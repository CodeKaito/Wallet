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
  TransactionMobileDetails,
} from "./pages";
import Charts from "./mobile/charts/Charts";
import { SideBar, TopBar, BottomBar } from "./navigationbar";
import AddPaymentModal from "./utils/AddPaymentModal";
import AddSavingModal from "./utils/AddSavingModal";
import AddDebtModal from "./utils/AddDebtModal";
import UpdateModal from "./utils/UpdateModal";
import Savings from "./pages/savings/Savings";

const App = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openSavingModal, setOpenSavingModal] = useState(false);
  const [openDebtModal, setOpenDebtModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleOpenPaymentModal = () => setOpenPaymentModal(true);
  const handleClosePaymentModal = () => setOpenPaymentModal(false);

  const handleOpenSavingModal = () => setOpenSavingModal(true);
  const handleCloseSavingModal = () => setOpenSavingModal(false);

  const handleOpenDebtModal = () => setOpenDebtModal(true);
  const handleCloseDebtModal = () => setOpenDebtModal(false);

  const handleOpenUpdateModal = (transaction) => {
    setTransactionToEdit(transaction);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setTransactionToEdit(null);
  };

  const handleUpdateSuccess = () => {
    handleCloseUpdateModal();
  };

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
      <AddDebtModal open={openDebtModal} onClose={handleCloseDebtModal} />
      <UpdateModal
        transaction={transactionToEdit}
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        onUpdateSuccess={handleUpdateSuccess}
      />

      <div className="app">
        {isDesktopOrLaptop && isLogged && <SideBar />}
        <main
          className={`content ${
            isDesktopOrLaptop && isLogged ? "content pl-16 lg:pl-22" : ""
          }`}
        >
          {isLogged && (
            <TopBar
              openPaymentModal={handleOpenPaymentModal}
              openSavingsModal={handleOpenSavingModal}
              openDebtModal={handleOpenDebtModal}
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
                  path="transactionMobile/:transactionId"
                  element={
                    <TransactionMobileDetails
                      openUpdateModal={handleOpenUpdateModal}
                      onUpdateSuccess={handleUpdateSuccess}
                    />
                  }
                />
                <Route
                  path="transactionMobile"
                  element={
                    <TransactionMobile onUpdateSuccess={handleUpdateSuccess} />
                  }
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

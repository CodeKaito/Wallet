import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
} from "./pages";
import { SideBar, TopBar, BottomBar } from "./navigationbar";
import AddPaymentModal from "./utils/AddPaymentModal";
import Savings from "./pages/savings/Savings";

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 398px)",
  });

  const isLogged = false;

  return (
    <>
      <AddPaymentModal open={open} onClose={handleClose} />
      <div className="app">
        {isDesktopOrLaptop && isLogged && <SideBar />}
        <main className="content">
          {isLogged && <TopBar openModal={handleOpen} />}
          <Routes>
            {!isLogged ? (
              <Route path="/" element={<Home />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="transaction" element={<Transaction />} />
                <Route path="income" element={<Income />} />
                <Route path="savings" element={<Savings />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="line" element={<Line />} />
              </>
            )}
          </Routes>
          {isDesktopOrLaptop && isLogged && <BottomBar />}
        </main>
      </div>
    </>
  );
};
export default App;

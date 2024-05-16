import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Dashboard, Transaction, Calendar, Bar, Pie, Line } from "./pages";
import { SideBar, TopBar, BottomBar } from "./navigationbar";
import AddPaymentModal from "./utils/AddPaymentModal";

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 398px)",
  });

  return (
    <>
      <AddPaymentModal open={open} onClose={handleClose} />
      <div className="app">
        {isDesktopOrLaptop ? <SideBar /> : null}
        <main className="content">
          <TopBar openModal={handleOpen} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="line" element={<Line />} />
          </Routes>
          {isDesktopOrLaptop ? null : <BottomBar />}
        </main>
      </div>
    </>
  );
};
export default App;

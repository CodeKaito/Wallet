import { Routes, Route } from "react-router-dom";
import { Dashboard, Transaction, Calendar, Bar, Pie, Line } from "./pages";
import { SideBar, TopBar } from "./navigationbar";

const App = () => {
  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;

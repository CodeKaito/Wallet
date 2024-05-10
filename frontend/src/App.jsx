import { Routes, Route } from "react-router-dom";
import { Home, Dashboard, Transaction, New } from "./pages";
import { SideBar, TopBar } from "./navigationbar";

const App = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="content">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="new" element={<New />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;

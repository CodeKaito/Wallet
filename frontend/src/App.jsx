import { Routes, Route } from "react-router-dom";
import { Dashboard, Transaction, New } from "./pages";
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
        </Routes>
      </main>
    </div>
  );
};
export default App;

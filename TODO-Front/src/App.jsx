import "./App.css";
import InputTask from "./ImputTask";
import TasksContainer from "./TasksContainer";
import TaskFilters from "./TaskFilters";
import Top from "./Top";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorList from "./pages/Admin/DoctorList";
const App = () => {
  const { adminToken } = useContext(AdminContext);
  return adminToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard/>} />
          <Route path="/all-appointments" element={<AllAppointments/>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/doctor-list" element={<DoctorList/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;

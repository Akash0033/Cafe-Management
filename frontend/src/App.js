import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Register from './Pages/Register';
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminDash from "./Pages/Admin/AdminDash";
import AdminNavbar from "./Components/AdminNavbar";
import ManageUsers from "./Pages/Admin/ManageUsers";
import Recharge from "./Pages/Admin/Reacharge";
import Settings from "./Pages/Admin/Settings";
import Home from "./Pages/Students/Home";
import About from "./Pages/Students/About";
import ManageItems from "./Pages/Admin/ManageItems";
import ManageCategories from "./Pages/Admin/ManageCategories";
import NewNavbar from "./Components/NewNavbar";
import ManageStudents from "./Pages/Admin/ManageStudents";
import ManageStaffs from "./Pages/Admin/ManageStaffs";
import MenuItemPage from "./Pages/Students/MenuItemPage";
import CheckoutPage from "./Pages/Students/CheckoutPage";
import ManageOrders from "./Pages/Admin/ManageOrders";
import BookingDetails from "./Pages/Admin/BookingDetails";

function App() {
  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/admin/AdminDash" element={<AdminDash />} />
        <Route path="/AdminNavbar" element={<AdminNavbar />} />
        <Route path="/admin/ManageCategories" element={<ManageCategories />} />
        <Route path="/admin/ManageUsers" element={<ManageUsers />} />
        <Route path="/admin/ManageStudents" element={<ManageStudents />} />
        <Route path="/admin/ManageStaffs" element={<ManageStaffs />} />
        <Route path="/admin/ManageItems" element={<ManageItems />} />
        <Route path="/admin/Recharge" element={<Recharge />} />
        <Route path="/admin/ManageOrders" element={<ManageOrders />} />
        <Route path="/admin/BookingDetails" element={<BookingDetails />} />
        <Route path="/admin/Settings" element={<Settings />} />
        <Route path="/Students/Home" element={<Home />} />
        <Route path="/Students/About" element={<About />} />
        <Route path="/Students/MenuItemPage" element={<MenuItemPage />} />
        <Route path="/Students/CheckoutPage" element={<CheckoutPage />} />
     
        <Route path="/admin/NewNavbar" element={<NewNavbar />} />
      </Routes>
    </Router>
    
  );
}

export default App;

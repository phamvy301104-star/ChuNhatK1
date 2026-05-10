import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./layout/sidebar/Sidebar";
import Header from "./layout/header/Header";
import CourseManagement from "./pages/khoadaotao/CourseManagement";
import Users from "./pages/users/Users";
import HocVien from "./pages/hocvien/HocVien";
import "./App.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  let activeItem = "Khóa đào tạo";
  if (location.pathname === "/quan-ly-nguoi-dung") activeItem = "Quản lý người dùng";
  if (location.pathname === "/hoc-vien") activeItem = "Học viên";

  const handleSelect = (item: string) => {
    if (item === "Quản lý người dùng") navigate("/quan-ly-nguoi-dung");
    if (item === "Học viên") navigate("/hoc-vien");
    if (item === "Khóa đào tạo") navigate("/");
  };

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <Sidebar activeItem={activeItem} onSelect={handleSelect} />
      )}
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CourseManagement />} />
        <Route path="/quan-ly-nguoi-dung" element={<Users />} />
        <Route path="/hoc-vien" element={<HocVien />} />
      </Route>
    </Routes>
  );
}

export default App;

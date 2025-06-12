import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register"; // ✅ Import Register
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* ✅ Add Register Route */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;

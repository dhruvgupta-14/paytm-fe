import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SendMoney from "./SendMoney";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import { Dashboard } from "./Dashboard";
import EditUser from "./EditUser";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" />

      <Routes>
        <Route path="*" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditUser/>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </>
  );
};

export default App;

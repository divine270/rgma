import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Salaries from "./pages/Salaries";
import Reports from "./pages/Reports";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />

        <Route
            path="/employees"
            element={
                <ProtectedRoute>
                    <Employees />
                </ProtectedRoute>
            }
        />

        <Route
            path="/salaries"
            element={
                <ProtectedRoute>
                    <Salaries />
                </ProtectedRoute>
            }
        />

        <Route
            path="/reports"
            element={
                <ProtectedRoute>
                    <Reports />
                </ProtectedRoute>
            }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
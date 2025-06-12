import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </AuthContextProvider>
  );
}

export default App;

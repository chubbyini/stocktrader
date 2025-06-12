import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

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

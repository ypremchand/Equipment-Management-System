import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = (userData) => {
    const user = userData.name ? userData : { name: "User" };
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  return (
    <Router>
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {!user ? (
          showLogin ? (
            <Route
              path="*"
              element={<Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowLogin(false)} />}
            />
          ) : (
            <Route
              path="*"
              element={<Register onSuccess={() => setShowLogin(true)} />}
            />
          )
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";

// Pages
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";

// Hook
import { useAuth } from "./hook/useAuth";

// Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Profile from "./Pages/Profile/Profile";
import Photo from "./Pages/Photo/Photo";
import Search from "./Pages/Search/Search";

function App() {
  const { loading, auth } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={auth ? <EditProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/users/:id"
            element={auth ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={auth ? <Search /> : <Navigate to="/" />}
          />
          <Route
            path="/photos/:id"
            element={auth ? <Photo /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

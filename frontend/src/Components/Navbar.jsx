import "./Footer.css";

import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

// hooks
import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../slices/authSlice";

export const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      navigate(`/search?q=${query}`)
    }
  };

  return (
    <nav id="nav">
      <Link to="/">
        <h2>ReactGram</h2>
      </Link>
      <form id="search-form" onSubmit={handleSubmit}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value) || ""}
        />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

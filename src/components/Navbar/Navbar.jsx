import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle, clearUser } from "../../Redux/slice.js";
import { getAuth, signOut } from "firebase/auth";
import Dropdown from "../Dropdown.jsx";
import DarkMode from "../DarkMode/DarkMode.jsx";
import { RiCloseLargeFill } from "react-icons/ri";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const isToggled = useSelector((state) => state.myCart?.toggle || false);
  const user = useSelector((state) => state.myCart?.user);
  const displayName = user?.name || "Guest";

  const toggleThemeHandler = () => {
    dispatch(toggle());
  };

  // Log out Handler
  const logOutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
        alert("You have successfully logged out.");
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage =
          error.message || "An error occurred while logging out.";
        alert(errorMessage);
      });
  };

  // Active class logic for Nav Links
  const getActiveClass = ({ isActive }) =>
    isActive
      ? "text-center p-3 mt-6 bg-black text-white hover:bg-gray-800"
      : "hover:bg-gray-800 text-center p-3 mt-6 text-gray-500 hover:text-white";

  return (
    <nav
      className={`h-[100px] flex fixed w-[100%]  z-10 top-0 justify-around items-center font-poppins font-medium shadow-custom-shadow ${
        isToggled ? "bg-white text-black" : "bg-black text-white"
      } transition-all duration-300 ease-in-out border-gray-200`}
    >
      <div className="logo flex gap-1">
        <img
          src={isToggled ? "./assets/logo.svg" : "./assets/logo2.svg"}
          alt="Logo"
        />
        <h1 className="self-center text-4xl font-semibold">FASHION</h1>
      </div>
      {/* Hamburger  */}
      <button onClick={() => setMenuOpen(true)} className="tablet:hidden block">
        <i className="fa-solid fa-bars dark:bg-gray-800 dark:border-gray-700 dark:text-white text-2xl"></i>
      </button>
      {/* Sidebar mobile menu  */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed h-full w-screen lg:hidden 
  bg-black/50 backdrop-blur-sm top-0 right-0 
  ${menuOpen ? "flex opacity-100" : "hidden opacity-0"} 
  transition-opacity transform duration-700 ease-in-out`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="text-black bg-white w-56 flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex"
        >
          <RiCloseLargeFill
            onClick={() => setMenuOpen(false)}
            className="mt-0 mb-8 text-3xl cursor-pointer"
          />
          <ul className="uppercase flex flex-col gap-10 text-gray-500 items-center">
            <li>
              <NavLink
                to="/"
                className={getActiveClass}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={getActiveClass}
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/cart"
                  className={getActiveClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Cart
                </NavLink>
              </li>
            )}
            {!user ? (
              <li>
                <NavLink
                  to="/signup"
                  className={getActiveClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logOutHandler();
                    setMenuOpen(false);
                  }}
                  className="hover:underline"
                >
                  Log Out
                </button>
              </li>
            )}
            <li>
              <NavLink
                to="/admin-login"
                className={getActiveClass}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </NavLink>
            </li>
            <li
              className="cursor-pointer text-xl flex items-center"
              onClick={toggleThemeHandler}
            >
              <DarkMode />
            </li>
            {user && (
              <li className="flex items-center gap-2 cursor-pointer mt-3 text-gray-500">
                <Dropdown />
                <span className="font-semibold text-xl">{displayName}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Navbar Desktop  */}
      <ul className="uppercase hidden tablet:flex gap-10 text-gray-500 items-center">
        <li>
          <NavLink to="/" className={getActiveClass(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={getActiveClass(false)}>
            Shop
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/cart" className={getActiveClass(false)}>
              Cart
            </NavLink>
          </li>
        )}
        {!user ? (
          <li>
            <NavLink to="/signup" className={getActiveClass(false)}>
              Sign Up
            </NavLink>
          </li>
        ) : (
          <li>
            <button onClick={logOutHandler} className="hover:underline">
              Log Out
            </button>
          </li>
        )}
        <li>
          <NavLink to="/admin-login" className={getActiveClass(false)}>
            Admin
          </NavLink>
        </li>
        <li
          className="cursor-pointer text-xl flex items-center"
          onClick={toggleThemeHandler}
        >
          <DarkMode />
        </li>
        {user && (
          <li className="flex items-center gap-2 cursor-pointer mt-3 text-gray-500">
            <Dropdown />
            <span className="font-semibold text-xl">{displayName}</span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

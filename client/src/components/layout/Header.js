import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    setCart([]);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logout Successfully");
    closeMenu();
    navigate("/");
  };

  const isLoggedIn = Boolean(auth?.token);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" onClick={closeMenu}>
          <span className="site-brand-icon" aria-hidden>
            ✦
          </span>
          <span>LuxeMart</span>
        </Link>

        <button
          type="button"
          className="site-header-toggler"
          aria-expanded={menuOpen}
          aria-controls="siteNavMenu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`site-header-toggler-icon ${menuOpen ? "is-open" : ""}`} />
        </button>

        <nav
          id="siteNavMenu"
          className={`site-header-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main"
        >
          <ul className="site-nav site-nav-actions">
            <li className="site-nav-item site-search-wrap">
              <SearchInput />
            </li>
            <li className="site-nav-item">
              <NavLink to="/" className="site-nav-link" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className="site-nav-item site-nav-dropdown dropdown">
              <button
                type="button"
                className="site-nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/categories" onClick={closeMenu}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${c.slug}`}
                      onClick={closeMenu}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="site-nav-item">
                  <NavLink
                    to="/register"
                    className="site-nav-link site-nav-link-cta"
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="site-nav-item">
                  <NavLink
                    to="/login"
                    className="site-nav-link site-nav-link-accent"
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="site-nav-item site-nav-dropdown dropdown">
                <button
                  type="button"
                  className="site-nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        Number(auth?.user?.role) === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            {isLoggedIn && (
              <li className="site-nav-item site-cart-badge">
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="site-nav-link site-cart-link"
                    onClick={closeMenu}
                  >
                    Cart
                  </NavLink>
                </Badge>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

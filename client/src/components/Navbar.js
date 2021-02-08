import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/auth.action";

export const Navbar = ({ showMenu, toggleMenu, isToken }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className="navbar sticky-top navbar-dark">
      <button className="navbar-toggler" onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand ml-3 mr-auto" to="/">
        My blog
      </Link>
      <div className="login">
        {!isToken ? (
          <NavLink
            to="/login"
            activeStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              height: "100%",
            }}
          >
            Login / Register
          </NavLink>
        ) : (
          <NavLink
            to="/profile"
            activeStyle={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <img
              className="mr-2"
              width="20"
              src={`/images/${userInfo.avatar}`}
              alt=""
            />
            {userInfo.name}
          </NavLink>
        )}
      </div>

      <div className="menu" style={{ left: showMenu && "0" }}>
        <h2 className="text-center">Menu</h2>
        <hr />
        <ul className="links-menu">
          <li>
            <NavLink to="/" exact activeClassName="active-link">
              Все посты
            </NavLink>
          </li>
          {!isToken ? (
            <li>
              <NavLink to="/login" activeClassName="active-link">
                Login / Register
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/profile" activeClassName="active-link">
                  Профиль
                </NavLink>
              </li>
              <li>
                <NavLink to="/my_posts" activeClassName="active-link">
                  Мои посты
                </NavLink>
              </li>
              <li>
                <NavLink to="/create_post" activeClassName="active-link">
                  Создать пост
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  onClick={() => dispatch(logout())}
                  activeClassName="active-link"
                >
                  Выйти
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* {showMenu && <div className="menu-overlay" onClick={toggleMenu}></div>} */}
    </nav>
  );
};

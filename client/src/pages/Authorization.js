import React, { useState } from "react";
import { Register } from "../components/Register";
import { Login } from "../components/Login";

export const Authorization = () => {
  const [activeTab, setActiveTab] = useState(false);

  return (
    <div className="row">
      <div className="col-6 mx-auto">
        <div className="tab-auth">
          <ul className="tab-auth-header">
            <li
              style={{ color: !activeTab && "#fff" }}
              onClick={() => setActiveTab(false)}
            >
              Авторизация
              <span
                className="bg"
                style={{
                  left: !activeTab ? "0" : "100%",
                }}
              ></span>
            </li>
            <li
              style={{ color: activeTab && "#fff" }}
              onClick={() => setActiveTab(true)}
            >
              <span
                className="bg"
                style={{
                  left: activeTab ? "0" : "-100%",
                }}
              ></span>
              Регистрация
            </li>
          </ul>
          {!activeTab ? (
            <Login />
          ) : (
            <Register backToLogin={() => setActiveTab(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

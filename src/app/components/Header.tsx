"use client";
import { useState } from "react";
import { state } from "../uiBuilder";
import { getMenuList } from "../utils/menuFactory";

export default function Header({ isLogin }: { isLogin: boolean }) {
  const [loginStatus, setLoginStatus] = useState(isLogin);
  const menuList = getMenuList(state);

  return (
    <div>
      <div>{loginStatus ? "Welcome!" : "Please login"}</div>
      <div style={{ display: "flex" }}>
        {menuList.map((menu) => (
          <div
            id="menu-btn"
            key={menu.label}
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={() => console.log(`go to ${menu.path}`)}
          >
            {menu.label}
          </div>
        ))}
      </div>
    </div>
  );
}

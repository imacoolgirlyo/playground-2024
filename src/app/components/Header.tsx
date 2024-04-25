// "use client";
import { useState } from "react";
import { state } from "../uiBuilder";
import { getMenuList } from "../utils/menuFactory";

export default async function Header() {
  const data = getData();
  const [loginStatus, setLoginStatus] = useState(false);
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

async function getData() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

"use client";
import { getMenusByLoginState, state } from "../uiBuilder";
import { getMenuList } from "../utils/menuFactory";

export default function Header() {
  // const menuList = getMenusByLoginState(state);
  const menuList = getMenuList(state);

  return (
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
      {/* {login.company === "LOGEN" && login.camUsable === "2" && (
        <Link href={"https://gigaeyes.co.kr/memberN/loginForm"}>
          <img src={""} />
        </Link>
      )} */}
    </div>
  );
}

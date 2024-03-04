import { ILoginState } from "./interface";

export const state = {
  isLogin: true,
  isUserIdStored: true,
  company: "LOTTE",
  userId: "test",
  branchName: "test",
  branchCode: "test",
  localIP: "test",
  saId: "test",
  accountId: "test",
  camUsable: "1",
  isAdmin: true,
  camStatus: "1",
};

const headerItems = [
  {
    label: "대시보드",
    path: "/",
    shouldRender: (login: ILoginState) => true,
  },
  {
    label: "송장조회",
    path: "/work",
    shouldRender: (login: ILoginState) => true,
  },
  {
    label: "이미지 조회",
    path: "/image",
    shouldRender: (login: ILoginState) =>
      login.camUsable === "1" || login.camStatus === "1",
  },
  {
    label: "영상추적",
    path: "/vass",
    shouldRender: (login: ILoginState) => login.camUsable === "2",
  },
  {
    label: "업무수정",
    path: "/edit",
    shouldRender: (login: ILoginState) =>
      login.company === "LOGEN" || login.company === "LOTTE",
  },
  {
    label: "Admin",
    path: "/admin",
    shouldRender: (login: ILoginState) => login.isAdmin,
  },
];

export const getMenusByLoginState = (login: ILoginState) => {
  return headerItems.filter((menu) => menu.shouldRender(login));
};

export const getMenuList = (login: ILoginState) => {
  const baseMenu = [{ label: "송장조회", path: "/work" }];
  const additionalMenus = [];

  // NOTE 이미지 기능 추가 구매 지점 또는 오토스캐너 사용 지점
  if (login.camStatus === "1" || login.camUsable === "1") {
    additionalMenus.push({
      label: "이미지 조회",
      path: "/image",
    });
  }

  // NOTE 오토스캐너+CCTV 사용 지점
  if (login.camUsable === "2") {
    additionalMenus.push({
      label: "영상추적",
      path: "/vass",
    });
  }

  // NOTE 이미지 설정 메뉴
  const menuList = baseMenu.concat(additionalMenus);

  // NOTE 업무 수정 메뉴
  if (login.company === "LOGEN" || login.company === "LOTTE") {
    menuList.push({
      label: "업무수정",
      path: "/edit",
    });
  }

  const adminMenu = {
    label: "Admin",
    path: "/admin",
  };
  // NOTE 관리자일 경우 이미지 설정 메뉴 추가
  if (login.isAdmin) {
    menuList.push(adminMenu);
  }

  return menuList;
};

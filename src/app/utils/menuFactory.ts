import { ILoginState } from "../interface";

export interface IMenu {
  label: string;
  path: string;
}

export interface IMenuFactory {
  createMenuList: (login: ILoginState) => IMenu[];
}

export class MenuFactory {
  baseMenu = [{ label: "송장조회", path: "/work" }];
  
  public createMenuList(login: ILoginState): IMenu[] {
    return [];
  }

  public createVideoMenu(login: ILoginState): IMenu[] {
    const videoMenu = [];
    if (login.camStatus === "1" || login.camUsable === "1") {
      videoMenu.push({
        label: "이미지 조회",
        path: "/image",
      });
    }

    // NOTE 오토스캐너+CCTV 사용 지점
    if (login.camUsable === "2") {
      videoMenu.push({
        label: "영상추적",
        path: "/vass",
      });
    }

    return videoMenu;
  }
}

export class LotteMenuFactory extends MenuFactory {
  public createMenuList(login: ILoginState): IMenu[] {
    const additionalMenus = this.createVideoMenu(login);

    const editMenu = {
      label: "업무수정",
      path: "/edit",
    };

    const todoMenu = {
      label: "업무 추가",
      path: "/add-todo",
    };

    return [...this.baseMenu, ...additionalMenus, editMenu, todoMenu];
  }
}

const getMenuFactory = (company: string) => {
  switch (company) {
    case "LOTTE":
      return new LotteMenuFactory();
    default:
      return new MenuFactory();
  }
};

export const getMenuList = (login: ILoginState) => {
  const factory = getMenuFactory(login.company);
  return factory.createMenuList(login);
};

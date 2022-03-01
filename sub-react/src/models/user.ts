import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { IUserInfo ,IMenu} from '../types';
import {apiGetMenus} from "@/api";
import {getTreeList} from "../utils";

type UserState = {
  userInfo: IUserInfo,
  menuList: IMenu[],
  menuStatus:number,
  sideMenuList:IMenu[]
}

export const user = createModel<RootModel>()({
  state: {
    userInfo: localStorage.userInfo?JSON.parse(localStorage.userInfo):{},
    menuList: [] as IMenu[],
    menuStatus:0,
    sideMenuList:[] as IMenu[]
  },
  reducers: {
    setUserInfo: (state: UserState, userInfo: IUserInfo) => {
      localStorage.setItem('userInfo',JSON.stringify(userInfo));
      return { ...state, userInfo };
    },
    setMenuList: (state: UserState, menuList: IMenu[]) => {
      return { ...state, menuList };
    },
    setMenuStatus: (state: UserState, status: number) => {
      return { ...state, menuStatus: status };
    },
    setSideMenuList: (state: UserState, sideMenuList:IMenu[]) => {
      return { ...state, sideMenuList };
    }
  },
  effects: (dispatch) => ({
    // async fetchMenus(state:UserState) {
    //   const res = await apiGetMenus();
    //   const menuList:IMenu[] = res.data;
    //   await dispatch.user.setMenuList(menuList);
    // },
    async fetchMenus(data:any,rootState) {
      const res = await apiGetMenus('sub-react');
      const menuList:IMenu[] = res.data;
      await dispatch.user.setMenuList(menuList);
      // const menuGroup:IMenuGroup=menuToGroup(menuList);
      // await dispatch.user.setMenuGroup(menuGroup)
      // if(!state.sideMenuList.length && menuGroup['/']){
      //   dispatch.user.setSideMenuList(menuGroup['/'])
      // }
      let menuSideList:IMenu[] = getTreeList(menuList);
      await dispatch.user.setSideMenuList(menuSideList);
      await dispatch.user.setMenuStatus(1);
    },
    async changeMenus(menuListFromParentApp:IMenu[]){
      let menuSideList:IMenu[] = getTreeList(menuListFromParentApp);
      await dispatch.user.setSideMenuList(menuSideList);
      await dispatch.user.setMenuStatus(1);
    }
  }),
});

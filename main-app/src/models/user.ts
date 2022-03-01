import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { IUserInfo ,IMenu,IMenuGroup} from '../types';
import {apiGetApps, apiGetMenus, apiLogin} from "@/api";
import {menuToGroup} from "@/utils";

type UserState = {
  userInfo: IUserInfo,
  token:string,
  menuList: IMenu[],
  menuStatus:number,
  menuGroup:IMenuGroup,
  sideMenuList:IMenu[],
  appList:IMenu[]
}

export const user = createModel<RootModel>()({
  state: {
    userInfo: localStorage.userInfo?JSON.parse(localStorage.userInfo):{},
    token:localStorage.token?localStorage.token:'',
    menuList: [] as IMenu[],
    menuStatus:0,
    menuGroup:{} as IMenuGroup,
    sideMenuList:[] as IMenu[],
    appList:[] as IMenu[]
  },
  reducers: {
    setUserInfo: (state: UserState, userInfo: IUserInfo) => {
      localStorage.setItem('userInfo',JSON.stringify(userInfo));
      return { ...state, userInfo };
    },
    setToken: (state: UserState, token: string) => {
      localStorage.setItem('token',token);
      return { ...state, token };
    },
    setMenuList: (state: UserState, menuList: IMenu[]) => {
      return { ...state, menuList };
    },
    setMenuStatus: (state: UserState, status: number) => {
      return { ...state, menuStatus: status };
    },
    setMenuGroup: (state: UserState, menuGroup: IMenuGroup) => {
      console.log('set menuGroup=>>>',menuGroup)
      return { ...state, menuGroup };
    },
    setSideMenuList: (state: UserState, sideMenuList:IMenu[]) => {
      return { ...state, sideMenuList };
    },
    setAppList:(state:UserState,headerAppList:IMenu[])=>{
      return { ...state, headerAppList };
    }
  },
  effects: (dispatch) => ({
    async logout( state:UserState) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.user.setUserInfo({});
      window.localStorage.clear();
    },
    async login(data:any,rootState){
      const res = await apiLogin(data);
      const {token,userInfo} = res.data;
      await dispatch.user.setUserInfo(userInfo);
      await dispatch.user.setToken(token);
      return res.data;
    },

    async fetchMenus(data:any,rootState) {
      const res = await apiGetMenus();
      const menuList:IMenu[] = res.data;
      console.log('主应用从接口获得menuList平级数据:',menuList);
      await dispatch.user.setMenuList(menuList);
      const menuGroup:IMenuGroup=menuToGroup(menuList);
      await dispatch.user.setMenuGroup(menuGroup)
      if(!rootState.user.sideMenuList.length && menuGroup['/']){
        dispatch.user.setSideMenuList(menuGroup['/'])
      }
      await dispatch.user.setMenuStatus(1);
    },
    async fetchApps(data:any,rootState){
      const res = await apiGetApps();
      const appList =res.data;
      console.log('主应用从接口获得appList应用列表数据:',appList);
      await dispatch.user.setAppList(appList);
    }
  }),
});

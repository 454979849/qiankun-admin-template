import microApps from './micro-app-config'
import {registerMicroApps,start} from "qiankun";
import store from "@/store";
import {apiGetMenus} from "@/api";
import {IMenu} from "@/types";
import {menuToGroup} from "@/utils";

//判断当前location是否激活子应用
export function isSubAppPage(pathname = window.location.pathname) {
  const name = `${pathname.split('/')[1]}`;
  return microApps.find((item) => item.activeRule === `/${name}`);
}

//获取当前激活子应用
export function getCurrentSubAppName(pathname = window.location.pathname) {
  const name = `${pathname.split('/')[1]}`;
  return microApps.find((item) => item.name === name);
}

//根据name判断，是否是激活子项目
export function isActiveApp(app:any, pathname = window.location.pathname) {
  return pathname.startsWith(`/${app.name}`);
}
//根据name 获取app配置
export function getAppByName(name:string) {

  return microApps.find((item) => item.name === name);
}

export default async function(){
  const sideMenuList = store.getState().user?.sideMenuList;
  if(localStorage.token){
    let res = await apiGetMenus();
    let menuList: IMenu[] = res.data;
    console.log('主应用从接口获得menuList平级数据:',menuList);
    await store.dispatch({type:'user/setMenuList',payload:menuList});
    const menuGroup = menuToGroup(menuList);
    await store.dispatch({type:'user/setMenuGroup',payload:menuGroup});
    if(!sideMenuList.length && menuGroup['/']){
      await store.dispatch({type:'user/setSideMenuList',payload:menuGroup['/']})
    };
    await store.dispatch({type:'user/setMenuStatus',payload:1});
  }

  registerMicroApps(microApps);
  start();
}

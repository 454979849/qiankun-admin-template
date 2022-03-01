import {IMenu, IMenuGroup} from '../types';
import {cloneDeep} from 'lodash';

export const menuToGroup = (oldDataList: IMenu[]) => {
  const dataList: IMenu[] = cloneDeep(oldDataList);
  const menuGroup: IMenuGroup = {};
  for (let i = 0; i < dataList.length; i++) {
    let item: IMenu = dataList[i];
    if (item.appPath !== '/') {
      item.url = item.appPath + '#' + item.url;
    }
    if (!(item.appPath in menuGroup)) {
      menuGroup[item.appPath] = [item];
    } else {
      menuGroup[item.appPath].push(item);
    }
  }
  ;
  for (let key in menuGroup) {
    menuGroup[key] = getTreeList(menuGroup[key]);
  }
  return menuGroup;
}
//
// export const getSideMenus =(menuGroup:IMenuGroup):IMenu[]=>{
//   const sideMenus:IMenu[] = [];
//   for(let key in menuGroup){
//     if(key==='/'){
//       sideMenus.push(...menuGroup[key]);
//     }
//     // else{
//     //   if(window.location.pathname===key){
//     //     sideMenus.push(...menuGroup[key]);
//     //   }
//     // }
//   }
//   return sideMenus
// }

export const getTreeList = (oldDataList: IMenu[], sortField: string = ''): IMenu[] => {
  if (!Array.isArray(oldDataList)) {
    throw new TypeError(`${oldDataList}不是数组`);
  }
  const dataList: IMenu[] = cloneDeep(oldDataList);
  // 第一次是将全部的permissionId作为对象的key重组成一个对象
  const formatObj: any = dataList.reduce((pre, cur) => {
    return {...pre, [cur['id']]: cur};
  }, {});
  // 排序
  const sortArray = sortField
    ? dataList.sort((a: IMenu, b: IMenu) => a['sort'] - b['sort'])
    : dataList;
  const formatArray = sortArray.reduce((arr: IMenu[], cur: IMenu) => {
    const pid = cur.parentId ? cur.parentId : 0;
    const parent = formatObj[pid];
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);
  return formatArray;
};

export function urlParse(search?: string) {
  let url = search || window.location.search;
  let obj: any = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    })
  }
  return obj;
}

export function redirectAddToken(url: string, token: string): string {
  let urlWithOutHash = '', hash = '';
  if (url.includes('#')) {
    urlWithOutHash = url.split('#')[0];
    hash = url.split('#')[1];
  } else {
    urlWithOutHash = url;
  }
  if (urlWithOutHash.includes('?')) {
    urlWithOutHash += '&token=' + token;
  } else {
    urlWithOutHash += '?token=' + token;
  }
  return urlWithOutHash + (hash ? `#${hash}` : '');
}

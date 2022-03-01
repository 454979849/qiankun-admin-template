import {IMenu} from '../types';
import {cloneDeep} from 'lodash';

export const getTreeList = (oldDataList: IMenu[], sortField: string = ''): IMenu[] => {
  if (!Array.isArray(oldDataList)) {
    throw new TypeError(`${oldDataList}不是数组`);
  }
  const dataList: IMenu[] = cloneDeep(oldDataList);
  // 第一次是将全部的permissionId作为对象的key重组成一个对象
  const formatObj: any = dataList.reduce((pre, cur) => {
    return { ...pre, [cur['id']]: cur };
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

export function urlParse(search?:string) {
  let url =search || window.location.search;
  let obj:any = {};
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


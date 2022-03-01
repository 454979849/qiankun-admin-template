import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import apps from '@/micro-app-config'
import {IMenuGroup} from "@/types";
import {RootState} from "@/store";
import {IMenu} from "@/types";
import actions from "@/store/qiankun";
import {cloneDeep} from "lodash";
import {isSubAppPage} from "@/qiankun";

const MicroRoute: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const menuGroup: IMenuGroup = useSelector((state: RootState) => state.user.menuGroup);
  let menuList: IMenu[] = useSelector((state: RootState) => state.user.menuList);

  useEffect(() => {
    const {pathname} = location;
    if (apps.find(item => item.activeRule === location.pathname)) {
      let subAppMenuListTree = menuGroup[pathname];
      // let sideMenuList = cloneDeep([...menuGroup['/'], ...subAppMenuListTree]);
      let sideMenuList = cloneDeep([ ...subAppMenuListTree]);
      console.log('subAppMenuListTree', subAppMenuListTree)
      dispatch.user.setSideMenuList(sideMenuList);

      if (isSubAppPage()) {
        let filterMenuList = menuList.filter(item => item.appPath === location.pathname);
        console.log('filterMenuList:',filterMenuList)
        actions.setGlobalState({
          subAppMenuList: filterMenuList
        })
      }

    } else {
      //进入 404页面组件
    }
  // }, [location])
  }, [])
  return <div id="sub-app-container"></div>
};
export default MicroRoute

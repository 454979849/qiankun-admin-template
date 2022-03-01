import React, {useEffect, useState} from 'react'
import {Navigate, Route} from 'react-router-dom';
import {RootState} from 'src/store';
import {useSelector, useDispatch} from "react-redux";
import {apiGetMenus} from "@/api";
import {IMenu} from "@/types";
import {Spin} from "antd";
import styles from './PrivateRoute.less'
interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props): React.ReactElement | null => {
  // const [fetchStatus, setFetchStatus] = useState(false);
  // const dispatch = useDispatch();
  // let menuList = useSelector((state: RootState) => state.user.menuList);
  //
  // async function fetchMenus() {
  //   let res = await apiGetMenus();
  //   let menuList: IMenu[] = res.data;
  //   await dispatch.user.setMenuList(menuList);
  //   setFetchStatus(true);
  // }
  //
  // useEffect(() => {
  //   if (!menuList || !menuList.length) {
  //     fetchMenus();
  //   }
  // }, [])
  const dispatch = useDispatch();
  const asyncSideMenus = async ()=>{
    await dispatch.user.fetchMenus();
  }
  let menuStatus = useSelector((state: RootState) => state.user.menuStatus);
  useEffect(()=>{
    if(!(window as any).__POWERED_BY_QIANKUN__){
      asyncSideMenus();
    }
  },[])

  if (!localStorage.token) {
    const url = (window as any).location.href;
    const mainAppOrigin = process.env.REACT_APP_MAIN_APP_ORIGIN+'/login';
    (window as any).location.href=mainAppOrigin+'?redirect='+encodeURIComponent(url);
    return null
  } else if (menuStatus==1) {
    return <props.component/>
  } else {
    return <div className={styles['loading-view']}><Spin size="large"/></div>
  }
}
export default PrivateRoute

import React, {useEffect, useState} from 'react'
import {Navigate, Route, useLocation} from 'react-router-dom';
import {RootState} from 'src/store';
import {useSelector, useDispatch} from "react-redux";
import {Spin} from "antd";
import styles from './index.less'

interface Props {
  component: React.FC
}

const PrivateRoute = (props: Props): React.ReactElement | null => {
  const location = useLocation();
  // const dispatch = useDispatch();
  let menuStatus:number = useSelector((state: RootState) => state.user.menuStatus);

  if (!localStorage.token) {
    return <Navigate to='/login'/>
  } else if (menuStatus==1) {  //判断当前路由是否有权限
    return <props.component/>
  } else {
    return <div className={styles['loading-view']}><Spin size="large"/></div>
  }
}
export default PrivateRoute

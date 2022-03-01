import React, { useState } from 'react';
import { Layout, Dropdown, Menu, Modal } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';
import { RootState } from '@/store';
import {useSelector,useDispatch} from 'react-redux';

const LayoutHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username: any  = useSelector((state: RootState) => (state.user.userInfo as any).username);
  const collapsed: boolean = useSelector((state: RootState) => state.app.collapsed);

  // 打开和关闭左侧菜单按钮事件
  const toggleHandler = () => {
    dispatch.app.toggleCollapse();
  };

  return (
    <Layout.Header className={styles['app-header']} style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: `${styles.trigger}`,
        onClick: toggleHandler,
      })}
      <b style={{color:'skyblue',fontSize:'18px'}}>2号子应用 sub-react2 的页头</b>
    </Layout.Header>
  );
};

export default LayoutHeader

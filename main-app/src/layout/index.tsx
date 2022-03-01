import React,{useEffect} from 'react'
import {Outlet,useNavigate} from "react-router-dom";
import {Layout} from "antd";
import LayoutHeader from "@/layout/LayoutHeader";
import LayoutSide from "@/layout/LayoutSide";
import styles from './layout.less'

const LayoutCom: React.FC = () => {
  return (
      <Layout className={styles['main-app-layout']}>
        {/* 侧边栏组件 */}
        <LayoutSide />
        <Layout>
          {/* 头部组件 */}
          <LayoutHeader />
          {/* 内容体 */}
          <Layout.Content className={styles['main-view-content']}>
              <Outlet />
              {/*<div id="sub-app-container"></div>*/}
          </Layout.Content>
          {/* 底部 */}
          {/*<Layout.Footer></Layout.Footer>*/}
        </Layout>
      </Layout>
  );
};
export default LayoutCom

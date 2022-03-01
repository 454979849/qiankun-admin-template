import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {Layout, Menu} from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import {FolderOpenOutlined, FileTextOutlined} from '@ant-design/icons';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';
import styles from './index.less';
import {IMenu} from '@/types';
import {isSubAppPage} from "@/qiankun";

const LayoutSide: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collapsed: boolean = useSelector((state: RootState) => state.app.collapsed);
  const [selectKey, setSelectKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [lastOpenKeys, setLastOpenKeys] = useState<string[]>([]);
  const sideMenuList:IMenu[] = useSelector((state: RootState) => state.user.sideMenuList);

  // 刷新的时候默认选中
  useMemo(() => {
    let oldOpenKeys=openKeys;
    let pathName = location.pathname;
    let url = location.pathname+location.hash;
    setSelectKey([url]);
    let openKeysArr:string[] = [];
    if(isSubAppPage()){
      let subAppHash = location.hash;
      let hashSplitArr = subAppHash.split('/');
      if(hashSplitArr.length>2){
        openKeysArr = Array.from(new Set([...oldOpenKeys,pathName+'#/'+hashSplitArr[1]]));
        setOpenKeys(openKeysArr);
        setLastOpenKeys(openKeysArr);
      }
    }else{
      let splitArr = pathName.split('/');
      if(splitArr.length>2){
        openKeysArr = Array.from(new Set([...oldOpenKeys,`/${splitArr[1]}`]));
        setOpenKeys(openKeysArr);
        setLastOpenKeys(openKeysArr);
      }
    }


  }, [location]);

  // 切换菜单
  const selectMenuHandler = (ev: any) => {
    const {key} = ev;
    const toPath = key && key.startsWith('/') ? key : `/${key}`;
    // 设置当前选中的
    setSelectKey(key);
    navigate(toPath);
  };
  // 点击切换菜单
  const onOpenChange = (openKeys: React.Key[]) => {
    if(!collapsed){
      setLastOpenKeys([...openKeys] as string[])
    }
    setOpenKeys(openKeys as string[]);
  };
  useEffect(()=>{
    if(!collapsed){
      setOpenKeys(lastOpenKeys);
    }
  },[collapsed])
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed} className={styles['main-app-side']}>
      <div className={styles.logo} onClick={() => navigate('/home')}>
        <img src={require('../../assets/logo.png').default} />
      </div>
      {/* 遍历菜单开始 */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectKey}
        openKeys={openKeys}
        onClick={selectMenuHandler}
        onOpenChange={onOpenChange}
      >
        {sideMenuList.map((item: IMenu) => {
          const renderMenu = (item: IMenu) => {
            if (item.children && item.children.length) {
              return (
                <Menu.SubMenu
                  key={item.url}
                  icon={item.icon ? item.icon : <FolderOpenOutlined/>}
                  title={item.name}
                >
                  {item.children.map((childrenItem: IMenu) => renderMenu(childrenItem))}
                </Menu.SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.url} icon={item.icon ? item.icon : <FileTextOutlined/>}>
                  {item.name}
                </Menu.Item>
              );
            }
          };
          return renderMenu(item);
        })}
      </Menu>
      {/* 遍历菜单结束 */}
    </Layout.Sider>
  );
};

export default LayoutSide

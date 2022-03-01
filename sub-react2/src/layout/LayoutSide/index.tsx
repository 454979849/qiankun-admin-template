import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {Layout, Menu} from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import {FolderOpenOutlined, FileTextOutlined} from '@ant-design/icons';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';
import styles from './index.less';
import {getTreeList} from '@/utils';
import {IMenu} from '@/types';

const LayoutSide: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collapsed: boolean = useSelector((state: RootState) => state.app.collapsed);
  const [selectKey, setSelectKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [lastOpenKeys, setLastOpenKeys] = useState<string[]>([]);
  const sideMenuList:IMenu[] = useSelector((state: RootState) => state.user.sideMenuList);
  useMemo(() => {
    let pathName = location.pathname;
    setSelectKey([pathName]);
    let splitArr = pathName.split('/');
    let oldOpenKeys=openKeys;
    let keys = splitArr.slice(0, splitArr.length - 1).map(item =>(item===''?'/':item)).join('');
    setOpenKeys(Array.from(new Set([...oldOpenKeys,keys])));
    setLastOpenKeys(Array.from(new Set([...oldOpenKeys,keys])));
  }, [location]);


  // const menus = useSelector((state: RootState) => state.user.menuList);
  // // 初始化菜单(格式化成树结构)
  // const initMenus = useCallback(() => {
  //   const menusTree = getTreeList(menus);
  //   setMenusDataList(menusTree);
  // }, [menus]);
  //
  // useEffect(() => {
  //   initMenus();
  // }, []);
  //
  // // 刷新的时候默认选中
  // useMemo(() => {
  //   let pathName = location.pathname;
  //   setSelectKey([pathName]);
  //   let splitArr = pathName.split('/');
  //   let oldOpenKeys=openKeys;
  //   let keys = splitArr.slice(0, splitArr.length - 1).map(item =>(item===''?'/':item)).join('');
  //   setOpenKeys(Array.from(new Set([...oldOpenKeys,keys])));
  //   setLastOpenKeys(Array.from(new Set([...oldOpenKeys,keys])));
  // }, [location]);

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
    <Layout.Sider trigger={null} collapsible collapsed={collapsed} className={styles['app-side']}>
      <div className={styles.logo} onClick={() => navigate('/menu1')}/>
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

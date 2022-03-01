import Mock from 'mockjs';

const menusList = [
  {
    id: 1,
    name: '2号子应用菜单1',
    parentId: 0,
    url: '/menu1',
    sort: 1,
    icon: null,
    appPath:'/sub-react2'
  },
  {
    id:2,
    name:'2号子应用菜单2',
    parentId:0,
    url:'/menu2',
    sort:2,
    icon:null,
    appPath:'/sub-react2'
  },
  {
    id:3,
    name:'2号子应用菜单2-1',
    parentId:2,
    url:'/menu2/level1',
    sort:1,
    icon:null,
    appPath:'/sub-react2'
  },
  {
    id:4,
    name:'2号子应用菜单2-2',
    parentId:2,
    url:'/menu2/level2',
    sort:2,
    icon:null,
    appPath:'/sub-react2'
  }
];

export const menusApi = Mock.mock('/api/menus', 'get', () => {
  return {
    code: 0,
    message: '获取权限菜单成功',
    data: menusList,
  };
});


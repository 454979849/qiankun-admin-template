import Mock from 'mockjs';

const menusList = [
  {
    id: 1,
    name: '首页',
    parentId: 0,
    url: '/home',
    sort: 1,
    icon: null,
    appPath:'/'
  },
  {
    id:2,
    name:'系统管理',
    parentId:0,
    url:'/system',
    sort:2,
    icon:null,
    appPath:'/'
  },
  {
    id:3,
    name:'用户管理',
    parentId:2,
    url:'/system/user',
    sort:1,
    icon:null,
    appPath:'/'
  },
  {
    id:4,
    name:'角色管理',
    parentId:2,
    url:'/system/role',
    sort:1,
    icon:null,
    appPath:'/'
  },
  {
    id: 5,
    name: '子应用菜单1',
    parentId: 0,
    url: '/menu1',
    sort: 1,
    icon: null,
    appPath:'/sub-react'
  },
  {
    id:6,
    name:'子应用菜单2',
    parentId:0,
    url:'/menu2',
    sort:2,
    icon:null,
    appPath:'/sub-react'
  },
  {
    id:7,
    name:'子应用菜单2-1',
    parentId:6,
    url:'/menu2/level1',
    sort:1,
    icon:null,
    appPath:'/sub-react'
  },
  {
    id:8,
    name:'子应用菜单2-2',
    parentId:6,
    url:'/menu2/level2',
    sort:2,
    icon:null,
    appPath:'/sub-react'
  },
  {
    id: 9,
    name: '2号子应用菜单1',
    parentId: 0,
    url: '/menu1',
    sort: 1,
    icon: null,
    appPath:'/sub-react2'
  },
  {
    id:10,
    name:'2号子应用菜单2',
    parentId:0,
    url:'/menu2',
    sort:2,
    icon:null,
    appPath:'/sub-react2'
  },
  {
    id:11,
    name:'2号子应用菜单2-1',
    parentId:10,
    url:'/menu2/level1',
    sort:1,
    icon:null,
    appPath:'/sub-react2'
  },
  {
    id:12,
    name:'2号子应用菜单2-2',
    parentId:10,
    url:'/menu2/level2',
    sort:2,
    icon:null,
    appPath:'/sub-react2'
  }
];

const appList = [
  {
    name:'Dorado',
    children:[
      {
        name:'多维分析',
        appPath:'/bi'
      }
    ]
  }
]

export const menusApi = Mock.mock('/api/menus', 'get', () => {
  return {
    code: 0,
    message: '获取权限菜单成功',
    data: menusList,
  };
});

export const appsApi = Mock.mock('/api/apps','get',()=>{
  return {
    code:0,
    message:'获取应用列表成功',
    data:appList
  }
})

export const loginApi = Mock.mock('/api/login', 'post', (data:any) => {
  const { username } = JSON.parse(data.body);
  return {
    code: 0,
    message: '登录成功',
    data: {
      userInfo:{userName:username,id:Math.floor(Math.random()*100+1)},
      token: '888888',
    },
  };
});

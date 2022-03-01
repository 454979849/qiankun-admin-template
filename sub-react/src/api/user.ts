import request from '@/utils/request'


export const apiGetMenus=(appPath:string)=>
  request({
    url:'/api/menus',
    method:'get'
  })


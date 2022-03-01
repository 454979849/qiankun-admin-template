import React from 'react'
export interface IMenu {
  id: number | string;
  name: string;
  parentId: number;
  url: string;
  sort: number;
  icon: string | null;
  children?: IMenu[];
}

export interface IRouter{
  redirect?: string;
  title?: string;
  path: string;
  component: React.ElementType;
  // component?: any;
  children?: IRouter[];
}

export interface IUserInfo{
  id?:number | string,
  [xxx:string]:any
}

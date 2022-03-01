/* 用于菜单的自定义图标 */
import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2915221_bb9vcj5j1pl.js",  //阿里巴巴字体库生成的资源地址
});

interface Props {
  type: string;
}

export default function Icon(props: Props): JSX.Element {
  return <IconFont type={props.type} />;
}

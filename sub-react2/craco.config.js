const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CracoAntDesignPlugin = require("craco-antd");
const CracoLessPlugin = require('craco-less');
const path = require('path')
const {name} = require('./package')
console.log('子应用名称：',name)
module.exports = {
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", {legacy: true}]]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/style/AntDesign/customTheme.less"
        ),
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modules: true
          },
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]_[hash:base64:5]',
            // 回调必须返回 `local`，`global`，或者 `pure`
            mode: (resourcePath) => {
              if (/pure\.(less|css)$/i.test(resourcePath)) {
                return 'pure'
              }
              if (/(global)\.(less|css)$/i.test(resourcePath)) {
                return 'global'
              }
              if (/antd/i.test(resourcePath)) {
                return 'global'
              }
              return 'local'
            },
          },
        },
        babelPluginImportOptions: {
          libraryDirectory: 'es'
        }
      },
    },
  ],
  devServer: {
    // 监听端口
    port: 8001,
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://10.11.46.135:7089',
    //     pathRewrite: {
    //       '^/api': '/AiMask/webApp',
    //     },
    //   },
    // },
  },
  webpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new SimpleProgressWebpackPlugin()
    ],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig, {env, paths}) => {
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        // ...{
        //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
        //   chunkFilename: 'static/js/[name].js'
        // },
        path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
        publicPath: env === 'production' ? '/micro/sub-react2/' : '/',
        library: `${name}-[name]`,
        // 将你的 library 暴露为所有的模块定义下都可运行的方式
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${name}`,
      }
      return webpackConfig
    },
  },
}

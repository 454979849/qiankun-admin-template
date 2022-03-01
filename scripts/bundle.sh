#!/bin/bash

rm -rf ./dist
mkdir ./dist
mkdir ./dist/micro

# main基座
cp -r ./main-app/dist/ ./dist/main-app/

# sub-react子应用
cp -r ./sub-react/dist/ ./dist/micro/sub-react/

# sub-react2子应用
cp -r ./sub-react2/dist/ ./dist/micro/sub-react2/

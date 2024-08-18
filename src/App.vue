<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import './Widgets/widgets.css'
import { onMounted, nextTick } from 'vue'
import initViewer from './cesium/initViewer.js'
import MousePosition from './cesium/MousePosition.js'
import CesiumNavigaion from 'cesium-navigation-es6'
import modifyMap from './cesium/MotifyMap.js'
import MotifyBuild from './cesium/MotifyBuild.js'

onMounted(() => {
  // 初始化地图
  const viewer = initViewer()
  // 鼠标经纬度拾取
  let mousePosition = new MousePosition(viewer)
  // 罗盘组件   cesium-navigation-es6    npm组件
  const options = {
    // 启用罗盘
    enableCompass: true,
    // 是否启用缩放
    enableZoomControls: true,
    // 是否启用指南针外环
    enableCompassOuterRing: true,
    // 是否启用距离的图例
    enableDistanceLegend: true
  }
  // 初始化罗盘
  let navigation = new CesiumNavigaion(viewer, options)
  // 修改底图颜色
  modifyMap(viewer)
  // 修改建筑底色
  MotifyBuild(viewer)

  nextTick(() => {
    // 设置沙箱允许使用js 解决控制台报错
    const iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0]
    if (iframe) {
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms')
      iframe.setAttribute('src', '')
    }
  })
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>

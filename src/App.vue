<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import './Widgets/widgets.css'
import { onMounted, nextTick } from "vue";
import initViewer from './cesium/initViewer.js'
import MousePosition from './cesium/MousePosition.js'


onMounted(() => {
  const viewer = initViewer()
  let mousePosition = new MousePosition(viewer);
  nextTick(() => {
    // 设置沙箱允许使用js 解决控制台报错
    const iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0]
    if (iframe) {
      iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms')
      iframe.setAttribute('src', '')
    }
  })
});
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

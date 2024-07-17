<script setup lang="ts">
import * as Cesium from 'cesium'
import './Widgets/widgets.css'
import { onMounted } from 'vue'
const tk = 'd1f396dd50888430f4a394b7201ef494'
// 设置cesium token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYWM0YzcwMS1lOTQyLTRmZGUtYjI4NC04OTEwNzkwNjhlOGMiLCJpZCI6MTA5Mjg4LCJpYXQiOjE2NjQyMDY2Mzd9.3NK8SNjCMd8chjFa-lhZhvnoTmbaFDvmwnMDGTLi0o8'
// 设置资源获取目录
window.CESIUM_BASE_URL = '/'
// 默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  // 西经
  89.5,
  // 南纬
  20.4,
  // 东经
  110.4,
  // 北纬
  61.2
)

onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // 是否显示信息窗口
    infoBox: false,
    // 是否显示查询按钮
    geocoder: false,
    // 是否显示home按钮
    homeButton: false,
    // 是否显示控制查看器的显示模式切换按钮
    sceneModePicker: false,
    // 是否显示图层选择
    baseLayerPicker: false,
    // 是否显示帮助按钮
    navigationHelpButton: false,
    // 是否显示播放动画按钮
    animation: false,
    // 是否显示时间轴
    timeline: false,
    // 是否显示全屏按钮
    fullscreenButton: false,
    // 设置天空盒
    skyBox: new Cesium.SkyBox({
      sources: {
        positiveX: "./texture/sky/px.jpg",
        negativeX: "./texture/sky/nx.jpg",
        positiveY: "./texture/sky/py.jpg",
        negativeY: "./texture/sky/ny.jpg",
        positiveZ: "./texture/sky/pz.jpg",
        negativeZ: "./texture/sky/nz.jpg",
      }
    }),
    /* 
    设置地形 - 
    若需要加载自定义的地形数据 》 
    1、地理空间数据云 （下载地形数据之后.tif格式）》
    2、cesiumlab.com 安装应用
    3、转换 数据处理-地形切片-三角算法vcg-储存类型散列 - 输出文件时选择好要输出到的文件夹》
    4、然后生成即可
    */
    //  自定义地形
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: "./terrain/gz"
    // }),
    // cesium默认地形
    terrainProvider: Cesium.createWorldTerrain({
      // 请求法向 - 山脉阴影等相关
      requestVertexNormals: true,
      // 水文
      requestWaterMask: true,
    }),
    // 天地图矢量底图
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //   url: "http://t0.tianditu.gov.cn/vec_w/wmts?tk=" + tk,
    //   layer: "tdtBasicLayer",
    //   style: "default",
    //   format: "image/jpeg",
    //   tileMatrixSetID: "GoogleMapsCompatible"
    // }),
    // 天地图影像底图
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //   url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=" + tk,
    //   layer: "tdtBasicLayer",
    //   style: "default",
    //   format: "image/jpeg",
    //   tileMatrixSetID: "GoogleMapsCompatible"
    // }),
    // OSM地图,
    // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
    //   url: "https://a.tile.openstreetmap.org/",
    // }),
    // 高德矢量地图,
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    //   layer: "tdtVecBasicLayer",
    //   style: "default",
    //   format: "image/png",
    //   tileMatrixSetID: "GoogleMapsCompatible",
    // }),
  })


  // 叠加图层
  // const imageryLayers = viewer.imageryLayers
  // const layer = imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
  //   url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=" + tk,
  //   layer: "tdtBasicLayerTitle",
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "GoogleMapsCompatible"
  // }))
  // // 设置透明度
  // layer.alpha = 0.5


  // 隐藏logo
  // @ts-ignore
  viewer.cesiumWidget.creditContainer.style.display = "none";
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>

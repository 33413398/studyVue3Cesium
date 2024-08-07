<script setup lang="ts">
import * as Cesium from 'cesium'
import './Widgets/widgets.css'
import { onMounted } from 'vue'
import gsap from "gsap";

const tk = 'd1f396dd50888430f4a394b7201ef494'
// 设置cesium token
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYWM0YzcwMS1lOTQyLTRmZGUtYjI4NC04OTEwNzkwNjhlOGMiLCJpZCI6MTA5Mjg4LCJpYXQiOjE2NjQyMDY2Mzd9.3NK8SNjCMd8chjFa-lhZhvnoTmbaFDvmwnMDGTLi0o8'
// 设置cesium静态资源路径
window.CESIUM_BASE_URL = "/";

// 设置cesium默认视角
// Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
//   // 西边的经度
//   89.5,
//   // 南边维度
//   20.4,
//   // 东边经度
//   110.4,
//   // 北边维度
//   61.2
// );


onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // 是否显示信息窗口
    infoBox: false,
    // 是否显示查询按钮
    // geocoder: false,
    // // 是否显示home按钮
    // homeButton: false,
    // // 是否显示控制查看器的显示模式切换按钮
    // sceneModePicker: false,
    // // 是否显示图层选择
    // baseLayerPicker: false,
    // // 是否显示帮助按钮
    // navigationHelpButton: false,
    // // 是否显示播放动画按钮
    // animation: true,
    // 是否显示时间轴
    timeline: false,
    // 是否显示全屏按钮
    // fullscreenButton: false,
    // // 设置天空盒
    // skyBox: new Cesium.SkyBox({
    //   sources: {
    //     positiveX: "./texture/sky/px.jpg",
    //     negativeX: "./texture/sky/nx.jpg",
    //     positiveY: "./texture/sky/py.jpg",
    //     negativeY: "./texture/sky/ny.jpg",
    //     positiveZ: "./texture/sky/pz.jpg",
    //     negativeZ: "./texture/sky/nz.jpg",
    //   }
    // }),
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
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 中国区划  GeoJson
  // const dataGeo = Cesium.GeoJsonDataSource.load("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json", {
  //   stroke: Cesium.Color.RED, // 边框颜色
  //   fill: Cesium.Color.SKYBLUE.withAlpha(0.5), // 填充颜色
  //   strokeWidth: 4, // 边框宽度
  // })
  // dataGeo.then((dataSources) => {
  //   viewer.dataSources.add(dataSources)
  //   let entities = dataSources.entities.values;
  //   entities.forEach((entity, i) => {
  //     // 各个区划材质
  //     entity.polygon.material = new Cesium.ColorMaterialProperty(
  //       Cesium.Color.fromRandom({
  //         alpha: 1,
  //       })
  //     );
  //     entity.polygon.outline = false;
  //     let randomNum = parseInt(Math.random() * 5);
  //     // 挤出高度
  //     entity.polygon.extrudedHeight = 100000 * randomNum;
  //   })
  // });
  // kml科研所
  // 加载kml数据
  // let kmlUrl = "./Assets/facilities1.kml";
  // let kmlDataPromise = Cesium.KmlDataSource.load(kmlUrl, {
  //   camera: viewer.scene.camera,
  //   canvas: viewer.scene.canvas,
  //   screenOverlayContainer: viewer.container,
  // });
  // console.log(kmlDataPromise);
  // kmlDataPromise.then(function (dataSource) {
  //   console.log(dataSource);
  //   viewer.dataSources.add(dataSource);
  // });
  // 加载kmz数据 - kml压缩包格式
  // let kmlUrl = "./Assets/gdpPerCapita2008.kmz";
  // let kmlDataPromise = Cesium.KmlDataSource.load(kmlUrl);
  // console.log(kmlDataPromise);
  // kmlDataPromise.then(function (dataSource) {
  //   console.log(dataSource);
  //   viewer.dataSources.add(dataSource);
  // });

  // czml
  // const czml = [
  //   {
  //     id: "document",
  //     name: "box",
  //     version: "1.0",
  //   },
  //   {
  //     id: "shape1",
  //     name: "Blue box",
  //     position: {
  //       cartographicDegrees: [-114.0, 40.0, 300000.0],
  //     },
  //     box: {
  //       dimensions: {
  //         cartesian: [400000.0, 300000.0, 500000.0],
  //       },
  //       material: {
  //         solidColor: {
  //           color: {
  //             rgba: [0, 0, 255, 255],
  //           },
  //         },
  //       },
  //     },
  //   },
  // ];
  // console.log(czml);
  // // 转换为json格式
  // // JSON.stringify(czml)
  // let czmlUrl = "./Assets/box.czml";
  // const dataSourcePromise = Cesium.CzmlDataSource.load(czmlUrl);
  // dataSourcePromise.then(dataSource => {
  //   viewer.dataSources.add(dataSource);
  //   viewer.flyTo(dataSource);
  // })

  // 加载kml数据
  const czml = [
    {
      id: "document",
      name: "CZML Point - Time Dynamic",
      version: "1.0",
    },
    {
      id: "point",
      // 物体在什么时间范围可用
      availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
      position: {
        // 设置物体的起始时间
        epoch: "2012-08-04T16:00:00Z",
        // 设置了四个维度，1维是时间，2维是经度，3维是纬度，4维是高度
        cartographicDegrees: [
          0, -70, 20, 150000, 100, -80, 44, 150000, 200, -90, 18, 150000, 300,
          -98, 52, 150000,
        ],
      },
      point: {
        color: {
          rgba: [255, 255, 255, 128],
        },
        outlineColor: {
          rgba: [255, 0, 0, 128],
        },
        outlineWidth: 3,
        pixelSize: 15,
      },
    },
  ];

  // 加载czml数据
  let promiseData = Cesium.CzmlDataSource.load(czml);
  promiseData.then((dataSource) => {
    console.log(dataSource);
    viewer.dataSources.add(dataSource);
    // viewer.flyTo(dataSource);
  });

});

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

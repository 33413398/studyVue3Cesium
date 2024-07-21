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

  // setview瞬间到达指定位置，视角
  // 生成position是天安门的位置
  const position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 100);
  // 生成广州塔的位置,113.3191, 23.109
  const position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.069, 2000);

  // 添加3D建筑
  const osmBuildings = viewer.scene.primitives.add(
    new Cesium.createOsmBuildings()
  );

  // 创建一个点
  const point = viewer.entities.add({
    // 定位点
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 700),
    // 点
    // point: {
    //   pixelSize: 10,
    //   color: Cesium.Color.RED,
    //   outlineColor: Cesium.Color.WHITE,
    //   outlineWidth: 4,
    // },
    // 文字标签
    label: {
      text: "广州塔",
      font: "24px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      // FILL填充文字、OUTLINE勾勒标签、FILL_AND_OUTLINE填充文字和勾勒标签
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      // 设置文字的偏移量
      pixelOffset: new Cesium.Cartesian2(0, -24),
      // 水平设置文字的显示位置 LEFT\RIGHT\CENTER
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      // 垂直设置文字的显示位置
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    // 广告牌
    billboard: {
      image: "/texture/gzt.png",
      width: 50,
      height: 50,
      // 水平的显示位置 LEFT\RIGHT\CENTER
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      // 垂直的显示位置
      verticalOrigin: Cesium.VerticalOrigin.TOP
    },
    // 添加模型
    model: {
      uri: "/model/Air.glb",
      // 最小像素
      minimumPixelSize: 128,
      // 设置轮廓
      silhouetteColor: Cesium.Color.WHITE,
      // 设置轮廓
      silhouetteSize: 5,
      // 设置相机距离模型多远的距离显示
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000)
    },
  });
  // viewer.camera.setView({
  //   // 指定相机位置
  //   destination: position,
  //   // 指定相机视角
  //   orientation: {
  //     // 指定相机的朝向,偏航角
  //     heading: Cesium.Math.toRadians(0),
  //     // 指定相机的俯仰角,0度是竖直向上,-90度是向下
  //     pitch: Cesium.Math.toRadians(-20),
  //     // 指定相机的滚转角,翻滚角
  //     roll: 0,
  //   },
  // });

  // flyto,让相机飞往某个地方
  viewer.camera.flyTo({
    destination: position2,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-20),
      roll: 0,
    },
  });

  // 通过按键移动相机
  document.addEventListener("keydown", (e) => {
    // console.log(e);
    // 获取相机离地面的高度
    var height = viewer.camera.positionCartographic.height;
    var moveRate = height / 100;
    if (e.key == "w") {
      // 设置相机向前移动
      viewer.camera.moveForward(moveRate);
    } else if (e.key == "s") {
      // 设置相机向后移动
      viewer.camera.moveBackward(moveRate);
    } else if (e.key == "a") {
      // 设置相机向左移动
      viewer.camera.moveLeft(moveRate);
    } else if (e.key == "d") {
      // 设置相机向右移动
      viewer.camera.moveRight(moveRate);
    } else if (e.key == "q") {
      // 设置相机向左旋转相机
      viewer.camera.lookLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key == "e") {
      // 设置相机向右旋转相机
      viewer.camera.lookRight(Cesium.Math.toRadians(0.1));
    } else if (e.key == "r") {
      // 设置相机向上旋转相机
      viewer.camera.lookUp(Cesium.Math.toRadians(0.1));
    } else if (e.key == "f") {
      // 设置相机向下旋转相机
      viewer.camera.lookDown(Cesium.Math.toRadians(0.1));
    } else if (e.key == "g") {
      // 向左逆时针翻滚
      viewer.camera.twistLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key == "h") {
      // 向右顺时针翻滚
      viewer.camera.twistRight(Cesium.Math.toRadians(0.1));
    } else {
      console.warn(`该键位${e.key}未绑定事件！`);
    }
  });
})


// 1/屏幕坐标系统，二维的笛卡尔坐标系，Cartesian2类型
// 2/地理坐标系统，WGS-84坐标系，Cartographic类型,经度，纬度，高度
// 3/笛卡尔空间直角坐标系，Cartesian3类型

// 角度与弧度的转换
const radians = Cesium.Math.toRadians(90);
console.log(radians);
// 弧度转角度
const degrees = Cesium.Math.toDegrees(2 * Math.PI);
console.log(degrees);

// 将经纬度转为笛卡尔坐标
const cartesian3 = Cesium.Cartesian3.fromDegrees(
  // 经度
  89.5,
  // 纬度
  20.4,
  // 高度
  100
);
console.log(cartesian3);

// 将笛卡尔坐标转为经纬度
const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
console.log(cartographic);
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

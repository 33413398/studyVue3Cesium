import * as Cesium from 'cesium'
export default function initViewer() {
  // 设置cesium token
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzNkNTE5Zi1mMjY4LTRiN2QtOTRlZC1lOTUyM2NhNDYzNWYiLCJpZCI6NTU0OTYsImlhdCI6MTYyNTAyNjMyOX0.a2PEM4hQGpeuMfeB9-rPp6_Gkm6O-02Dm4apNbv_Dlk'

  // 设置cesium静态资源路径
  window.CESIUM_BASE_URL = '/'

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
    fullscreenButton: false
  })
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'

  // 广州塔
  const postion = Cesium.Cartesian3.fromDegrees(
    // 经度
    113.3191,
    // 纬度
    23.109,
    // 高度
    1000
  )
  viewer.camera.flyTo({
    destination: postion,
    duration: 2
  })
  return viewer
}

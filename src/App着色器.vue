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
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  // 西边的经度
  89.5,
  // 南边维度
  20.4,
  // 东边经度
  110.4,
  // 北边维度
  61.2
);


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

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 添加3D建筑
  // const osmBuildings = viewer.scene.primitives.add(
  //   new Cesium.createOsmBuildings()
  // );

  // let material = new Cesium.GridMaterialProperty({
  //   color: Cesium.Color.YELLOW,
  //   cellAlpha: 0.2,
  //   lineCount: new Cesium.Cartesian2(4, 4),
  //   lineThickness: new Cesium.Cartesian2(4.0, 4.0),
  // });

  class CustomMaterialPropery {
    constructor() {
      this.definitionChanged = new Cesium.Event();
      Cesium.Material._materialCache.addMaterial("CustomMaterial", {
        fabric: {
          type: "CustomMaterial",
          uniforms: {
            uTime: 0,
          },
          source: `
          czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            material.diffuse = vec3(materialInput.st, uTime);
            return material;
          }

          `,
        },
      });

      this.params = {
        uTime: 0,
      };
      gsap.to(this.params, {
        uTime: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });
    }
    getType() {
      // 返回材质类型
      return "CustomMaterial";
    }
    getValue(time, result) {
      // // console.log(result, time);
      // let t = performance.now() / 1000;
      // t = t % 1;
      // console.log(t);
      // result.uTime = t;
      result.uTime = this.params.uTime;
      // 返回材质值
      return result;
    }
  }

  let material = new CustomMaterialPropery();


  console.log(material);

  var rectangle = viewer.entities.add({
    id: "entityRect",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        90,
        // 南边维度
        20,
        // 东边经度
        110,
        // 北边维度
        30
      ),
      // 设置entity材质，MaterialProperty
      // material: Cesium.Color.RED.withAlpha(0.5),
      material: material,
    },
  });
  console.log(rectangle);

  // primivite创建矩形
  // 01-创建几何体
  let rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      115,
      // 南边维度
      20,
      // 东边经度
      135,
      // 北边维度
      30
    ),
    // 距离表面高度
    height: 0,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  });

  // 02-创建几何体实例
  let instance = new Cesium.GeometryInstance({
    id: "redRect",
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5)
      ),
    },
  });

  let rectGeometry1 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      140,
      // 南边维度
      20,
      // 东边经度
      160,
      // 北边维度
      30
    ),
    // 距离表面高度
    height: 0,
    // vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  let instance2 = new Cesium.GeometryInstance({
    id: "blueRect",
    geometry: rectGeometry1,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.BLUE.withAlpha(0.5)
      ),
    },
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  });

  // 03-设置外观

  // 使用instance的颜色去着色
  // let material1 = new Cesium.Material({
  //   fabric: {
  //     type: "Color",
  //     uniforms: {
  //       color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
  //     },
  //   },
  // });

  // let material1 = new Cesium.Material({
  //   fabric: {
  //     type: "Image",
  //     uniforms: {
  //       image: "texture/logo.png",
  //     },
  //   },
  // });

  // 编写着色器修改材质
  // https://cesium.com/downloads/cesiumjs/releases/b28/Documentation/
  // let material1 = new Cesium.Material({
  //   fabric: {
  //     uniforms: {
  //       uTime: 0,
  //     },
  //     source: `
  //       czm_material czm_getMaterial(czm_materialInput materialInput)
  //       {
  //         // 生成默认的基础材质
  //         czm_material material = czm_getDefaultMaterial(materialInput);
  //         // material.diffuse = vec3(materialInput.st+uTime, 0.0);
  //         float strength = mod((materialInput.s-uTime) * 10.0, 1.0);
  //         material.diffuse = vec3(strength, 0.0, 0.0);
  //         return material;
  //       }
  //     `,
  //   },
  // });
  let material1 = new Cesium.Material({
    fabric: {
      uniforms: {
        uTime: 0,
      },
      source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
          // 生成默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          // material.diffuse = vec3(materialInput.st+uTime, 0.0);
          float strength = mod((materialInput.st.x-uTime) * 10.0, 1.0);
          material.diffuse = vec3(strength, 0.0, 0.0);
          return material;
        }
      `,
    },
  });


  // gsap.to(material1.uniforms, {
  //   uTime: 1,
  //   duration: 2,
  //   repeat: -1,
  //   ease: "linear",
  // });

  console.log(material1);
  console.log(material1.shaderSource);

  // 设定几何体都是与地球的椭球体平行
  //假定几何体与地球椭球体平行，就可以在计算大量顶点属性的时候节省内存
  // let appearance = new Cesium.EllipsoidSurfaceAppearance({
  //   material: material1,
  //   aboveGround: false,
  //   translucent: true,
  // });
  let appearance: any = new Cesium.EllipsoidSurfaceAppearance({
    // material: material1,
    // aboveGround: false,
    // translucent: true,
    // uniform不在这里传值
    // uniforms: {
    //   uTime: 0,
    // },
    fragmentShaderSource: `
    varying vec3 v_positionMC;
    varying vec3 v_positionEC;
    varying vec2 v_st;
    uniform float uTime;

    void main()
    {
        czm_materialInput materialInput;

        gl_FragColor = vec4(v_st,uTime, 1.0);
    }
    `,
  });
  appearance.uniforms = {
    uTime: 0,
  };
  gsap.to(appearance.uniforms, {
    uTime: 1,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "linear",
  });
  console.log(appearance.vertexShaderSource);
  console.log(appearance.fragmentShaderSource);

  // let appearance = new Cesium.MaterialAppearance({
  //   material: material1,
  // });
  // 04-图元
  let primitive = new Cesium.Primitive({
    geometryInstances: [instance, instance2],
    appearance: appearance,
    show: true,
  });
  // 05-添加到viewer
  viewer.scene.primitives.add(primitive);

  viewer.camera.setView(viewer.entities);
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

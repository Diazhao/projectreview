### three中camera相机初始化时视野范围能够fit模型大小的设置代码

    this.adjustCamera = function() {

        var fov = _this.camera.fov;
        _this.mall.building.geometry.computeBoundingBox();
        _this.mall.building.geometry.computeBoundingSphere()
        var boundingSphere = _this.mall.building.geometry.boundingSphere;
        var boungingBox = boundingSphere.getBoundingBox();
        var size = boungingBox.max.x - boungingBox.min.x;
        var distance = size/2/Math.tan(fov/2);
        console.log(distance);
        _this.setDefaultView(distance/2);//the best distance
    }
    
    this.setDefaultView = function (cameraLen) {

        var camAngle = _this.mall.FrontAngle + Math.PI/2;
        var camDir = [Math.cos(camAngle), Math.sin(camAngle)];
        var camLen = cameraLen || 500;
        var tiltAngle = 75.0 * Math.PI/180.0;
        _this.camera.position.set(camDir[1]*camLen, Math.sin(tiltAngle) * camLen, camDir[0]*camLen);//TODO: adjust the position automatically
        _this.camera.lookAt(_scene.position);

        redraw();//you redraw functions
        return _this;
    }

### three-geojson加载普通json数据格式的要求
  加载的json数据中，需要区分建筑整体与楼层内部详细信息。
  其中，建筑整体指的是包括了所有楼层的外包多边形。楼层内部信息指的是，建筑内部的楼层，楼层中的详细房间，兴趣点以及文字标注信息。
加载示例如下：
  {
      "data": {
          "Floors": [
            {
                "_id": "楼层唯一标识",
                "Name": "展示在图层控制器上的名称",
                "Name_en": "",
                "Brief": "简单描述",
                "High": "高度",
                //属于本层楼的兴趣点
                "PubPoint": [
                    {
                        "_id": "唯一标识“，
                        "Name": "点位名称",
                        "Name_en": "英文名称,可作为图标路径依赖",
                        "Brief": "简单描述",
                        //位置信息，为了统一，使用如下方式处理
                        "Outline": [[[120,30]]],
                        "Type": "类别,可作为图标区分"
                    }
                ],
                //功能区域
                "FuncAreas": [
                    "_id": "唯一标识",
                    "Name": "名称",
                    "Name_en": "",
                    "High": "高度",
                    "Category": "类别,主要在代码中用于区分样式(颜色透明度等)",
                    "Center": [],//中心点,代码中会重新计算
                    "Outline": [[[120,30,121,30,120,31,121,31,120,30]]]//首尾相接的数组
                ],
                楼层的外包多边形
                "Outline": [[[120,30,121,30,120,31,121,31,120,30]]]//首尾相接的数组
            }
          ],
          "buildings": {
            "_id":"",
            "DefaultFloor":1,
            "High":3,
            "FloorsId":"1,2,3,4",//所有楼层id的集合
            "Outline": [[[120,30,121,30,120,31,121,31,120,30]]]//首尾相接的数组
          }
      }
  }
  以上数据是three-geojson支持加载的数据类型。下一步接入geojson数据，目标是将geojson数据转换成上述的格式，再给three-geojson加载
### three-geojson加载geojson数据格式的要求

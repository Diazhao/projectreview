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
加载示例如 normal.json 中所体现的
  以上数据是three-geojson支持加载的数据类型。下一步接入geojson数据，目标是将geojson数据转换成上述的格式，再给three-geojson加载
### three-geojson加载geojson数据格式的要求
  geojson中主要是属性数据做了要求，为了区分建筑，楼层，楼层内部的信息等。

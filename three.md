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

/**
 * @description 构造函数
 * @param {Function} fn -回调函数
 */
function Promise(fn){
    var self = this;
    self.status = 'pending';
    self.data = undefined;
    self.onResolveCallback = [];
    self.onRejectCallback = [];

    function resolve(value) {
        if(self.status === 'pending'){
            self.status = 'resolved';
            self.data = value;
            for(var i=0;i<self.onResolveCallback.length;i++){
                self.onResolveCallback[i](value);
            }
        }
    }

    function reject(reason) {
        if(self.status === 'pending'){
            self.status = 'rejected';
            self.data = reason;
            for(var i=0;i<self.onRejectCallback.length;i++){
                self.onRejectCallback[i](reason);
            }
        }
    }

    try {
        fn(resolve,reject);
    } catch(e){
        reject(e)
    }
}

Promise.prototype.then = function(onResolve,onReject){
    var self = this;
    var promise2,
        onResolve = typeof onResolve === 'function' ? onResolve : function(value){},
        onReject = typeof onReject === 'function' ? onReject : function(){reject};

    if(self.status === 'resolved'){
        return promise2 = new Promise(function(resolve,reject){
            try{
                var x = onResolve(self.data);
                if(x instanceof Promise){
                    x.then(resolve,reject)
                }
                resolve(x);
            }catch (e){
                reject(e);
            }
        })
    }
    if(self.status === 'rejected'){
        return promise2 = new Promise(function(resolve,reject){
            try{
                var x = onReject(self.data);
                if(x instanceof Promise){
                    x.then(resolve,reject)
                }
                resolve(x);
            }catch (e){
                reject(e);
            }
        })
    }
    if(self.status === 'pending'){
        return promise2 = new Promise(function(resolve,reject){
            self.onResolveCallback.push(function(value){
                try{
                    var x = onResolve(self.data);
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }
                    resolve(x);
                }catch (e){
                    reject(e);
                }
            })
            self.onRejectCallback.push(function(value){
                try{
                    var x = onReject(self.data);
                    if(x instanceof Promise){
                        x.then(resolve,reject)
                    }
                    resolve(x);
                }catch (e){
                    reject(e);
                }
            })
        })
    }
}

Promise.prototype.catch = function(onReject){
    this.then(null, onReject);
}
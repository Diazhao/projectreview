var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve("这个是调用resolve");
    },300)

    // setTimeout(function(){
    //     reject("这个是调用reject");
    // },600)
}).then(function(value){
    console.log('then1,resolve',value)
    Promise.resolve('这是第二次调用resolve');
},function(value){
    console.log('then1,reject',value)
}).then(function(value){
    console.log('then2,resolve',value)
    return '这是第三次调用resolve';
},function(value){
    console.log('then2,reject',value)
}).then(function(value){
    console.log('then3,resolve',value)
    return '这是第四次调用resolve';
},function(value){
    console.log('then3,reject',value)
}).then(function(value){
    console.log('then4,resolve',value)
})
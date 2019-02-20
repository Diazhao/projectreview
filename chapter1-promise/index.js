// var promise = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         resolve("这个是调用resolve");
//     },300)

//     // setTimeout(function(){
//     //     reject("这个是调用reject");
//     // },600)
// }).then(function(value){
//     console.log('then1,resolve',value)
//     return('这是第二次调用resolve');
// },function(value){
//     console.log('then1,reject',value)
// }).then(function(value){
//     console.log('then2,resolve',value)
//     return '这是第三次调用resolve';
// },function(value){
//     console.log('then2,reject',value)
// }).then(function(value){
//     console.log('then3,resolve',value)
//     return '这是第四次调用resolve';
// },function(value){
//     console.log('then3,reject',value)
// }).then(function(value){
//     console.log('then4,resolve',value)
// })

function red(){
    console.log(1);
}
function green(){
    console.log('2');
}
function yellow(){
    console.log('3');
}

function commoncall(cb, timmer){
    return new Promise(function(resolve, reject) {
        setTimeout( () => {
            cb();
            resolve();
        }, timmer)
    });
}
function timmer(){
    // setTimeout(() => {
        commoncall(red,5).then(()=>{
            commoncall(green,10);
        }).then(()=>{
            commoncall(yellow, 15);
        }).then(()=>{
            timmer();
        });
    // })
}

timmer();


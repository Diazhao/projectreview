function deepCopy(obj, hash = new WeakMap()){
    if(!isObject(obj)) return obj;
    if(hash.has(obj)) return hash.get(obj);

    var target = Array.isArray(obj) ? [] : {};
    hash.set(obj, target);

    for(var key in obj){
        if(isObject(obj[key])){
            target[key] = deepCopy(obj[key], hash)
        }else{
            target[key] = obj[key]
        }
    }

    return target;
}

function deepCopy2(obj){
    var root = {};
    var loopStack = [
        {
            parent: root,
            data: obj,
            key: undefined
        }
    ]

    while(loopStack.length){
        var node = loopStack.pop();
        var parent = node.parent;
        var data = node.data;
        var key = node.key;

        var res = parent;
        if(typeof key !== "undefined"){
            if(Array.isArray(data)){
                res = parent[key] = [];
            }else{
                res = parent[key] = {};
            }
            
        }
        for(var k in data){
            if(isObject(data[k])){
                loopStack.push({
                    parent: res,
                    key: k,
                    data: data[k]
                })
            }else{
                res[k] = data[k]
            }
        }
    }

    return root;
}

function isObject(obj){
    return typeof obj === 'object' && obj !== null;
}

function test(){
    var aa = {a: 123, b: {bc: 456, bd: 789, bf: {bfc: 999, bfd: 987}},c: [1,2,3]};

    // aa.circle = aa;

    var bb = deepCopy2(aa);

    console.log(aa);

    console.log(bb);
}
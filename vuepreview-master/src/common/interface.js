import mPromise from './Promise'

export default {
    getImage: function(){
        return new mPromise(function(resolve){
            setTimeout(function(){
                resolve("i am promiser image");
            })
            //resolve("i am promiser image");
        });
    }
}
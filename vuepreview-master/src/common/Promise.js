class Promise {
    constructor(fn){
        let value,
            callbacks = [];

        this.then = function(thens){
            callbacks.push(thens);
            return this;
        }

        function resolve(value){
            callbacks.forEach(callback => {
                callback(value);
            })
        }
        fn(resolve);
    }
}

export default Promise;
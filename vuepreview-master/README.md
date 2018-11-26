## 使用vue加载地图时的注意事项

### 1.数据监听绑定
vue方便之处之一在于数据的双向绑定，可以为我们的开发带来很多便利。但是，监听数据时所用的资源消耗，也会造成程序运行的不流畅甚至阻塞。
#### 1.1 data使用注意事项
“data中存放的数据，应该知识data本身。” 也就是说，data中存放的数据，最好仅仅是用来方便我们与渲染模板中的数据绑定。data中的数据vue会递归所有可枚举属性进行绑定监听，数据量过大的时候，在这一步会造成较大的消耗。因此，触发一些计算属性可以在compute中完成，一些组件内的私有类内变量，可以在组件create的时候声明. 具体如下所示 

     new Vue({
        el: '#editor',
        data: {
          input: '# hello',
          //以下由ol或者dhgis创建的对象，可以不用放在data中
          //map,
          //layer,
          //draw,
          //measure
        },
        computed: {
          compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
          }
        },
        created(){
            this.innerF = null;
            this.innerD = null;
        },
        methods: {
          update: _.debounce(function (e) {
            this.input = e.target.value
          }, 300)
        }
     })  
     
 涉及到地图的使用的时候，需要注意的是。
 1. map对象不能放在data属性中，map对象上会添加图层，图层的所有feature都会在map对象上存在引用调用。监听后，添加数据的时候，会不停的触发数据中各级数据的getter与setter，数据量过大是，最终会造成程序运行卡死。
 2. 同理，为了规避这一类问题，我们尽量不要将ol或者是dhgis创建的对象，放在data中。
 3. 同理，所有vue中涉及数据绑定的选项中，都最好不要放上述ol与dhgis创建的对象。例如，data，props，vuex
#### 1.2 vuex
vuex中的数据也基本是响应式的，官网中对vuex的解释如下：

     Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态。 
 所以我们在vuex中储存的数据也最好是程序中组件的状态相关的数据，而非是需要组件间共享的数据。如果涉及到组件间需要共享数据，有相应的解决方案。
 
 #### 1.3 组件生命周期管理
 vue组件的使用时创建的定时器，setInterval，map.on("click")此类的事件，在组件销毁时，也应该一并销毁掉。不然可能会存在占用内存的情况出现。
 
 #### 1.4 map在组件之间的传递
 上面提到map不能通过组件的props传递。相应的，有两种解决方案。
 1. 新版本的dhgis-base中，在map对象创建后会返回相对应的mapId。我们可以通过DHMapLib.DHMap.getMap("mapId")获取到对应的map对象。
 2. 老版本的dhgis中，由于没有类似DHMapLib的全局变量存在，因此在使用一个<dh-map></dh-map>组件后，组件内部会在vm.$root中创建一个vm.$root.gMap，dh-map初始化完成之后，其他组件中都可以通过this.$root.gMap访问到当前操作的map对象。  

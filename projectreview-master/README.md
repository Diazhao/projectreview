## TODO List

最近埋头做业务，很少回顾所用到的知识，感觉有点飘。所以新建一个项目，整理下最近所学的知识。    
### 1.webpack打包相关
#### 1.1 初始化一个webpack项目
     使用webpack4的最新版本，可以零配置打包一个工程，但是较为简单。需要进行手动配置才能满足真实的需要。
#### 1.2 使用webpack的babel相关功能
#### 1.3 使用相关的loader
     loader主要在test中匹配到相应的文件，然后进行对应的处理后，打包。
     style-loader,css-loader,file-loader...loader的配置如下所示
       module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
#### 1.4 使用插件
    webpack支持一系列很强大的插件配置辅助打包，插件是webpack应用的主要部分。介绍几个常用的插件。
##### HtmlWebpackPlugin 
html-webpack-plugin,使用通用的一个html模板，自动将打包后的js文件引入到html文件中。从而解决了每次打包配置都需要添加js文件的繁琐。
##### CleanWebpackPlugin
clean-webpack-plugin,清除指定的文件夹。
##### commons-chunk-plugin
提取公用部分代码，webpack4以下常用，但是在webpack4中已经被
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
替代。
#### 1.5 如何写一个自己的插件
     webpack中为用户提供了对应的hook可以使用户编写属于自己业务的个性化的插件。理解插件的编写，最终要的是要弄清楚两个对象，一个Compiler一个是Compilation。编写插件的例子可以参考官网的教程，https://webpack.js.org/contribute/writing-a-plugin/
     class FileListPlugin {
          apply(compiler) {
               
          }
     }
     可以看到，在新创建一个插件的类的时候，必须要重写一个apply函数，在webpack编译的时候，会运行插件，找到这个函数并且执行。
     Compiler是一个webpack总体的对象，webpack一旦开始运行，就初始化了这个对象。后续的操作，也都基本基于这个对象。
     下面是在apply中填充内容。
     class FileListPlugin {
         apply(compiler) {
           // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
           compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
           }
        }
     }
     这时候我们看到了compiler.hooks.<hookstype>.tabAsync.
     这种是webpack4中新增的写法，hookstype 对应编译不同时期的钩子，这里可以参考webpack官方文档，https://webpack.js.org/api/compiler-hooks/    不得不说，官方网站的api还是很完备的。
     compilation,汇编，编辑。即compiler每完成一次编辑，或者构建都会被调用一次。这段官网的说明，只可意会。
      A compilation instance has access to all modules and their dependencies (most of which are circular references). It is the literal compilation of all the modules in the dependency graph of an application. During the compilation phase, modules are loaded, sealed, optimized, chunked, hashed and restored.
      compilation同样提供了很多生命周期的钩子供调用。https://webpack.js.org/api/compilation-hooks/
      只有真正理解了这两个对象，才能顺手的编写webpack插件。
### 2.vue相关的知识点
#### 2.1 初始化一个新的vue项目
#### 2.2 vue的项目目录结构
#### 2.3 使用vue做数据可视化时的注意事项
#### 2.4 vue的数据流向
#### 2.5 vue-cli 配置文件解析

### 3.openlayers or leaflet

### 4.threejs数据可视化主要是地图的展示

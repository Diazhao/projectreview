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
#### 1.5 配置开发环境

### 2.vue相关的知识点
#### 2.1 初始化一个新的vue项目
#### 2.2 vue的项目目录结构
#### 2.3 使用vue做数据可视化时的注意事项
#### 2.4 vue的数据流向
#### 2.5 vue-cli 配置文件解析

### 3.openlayers or leaflet

### 4.threejs数据可视化主要是地图的展示

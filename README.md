# yx-sm

> 基于sui-mobile定制的前端界面。 UI设计效果见design 文件夹。

## 可以从首页依次进入各个分支页面。

<div style="text-align:center">

<img src="design/index.png" width="400" />

<img src="design/button.png" width="400" />

<img src="design/accordion.png" width="400" />

<img src="design/label.png" width="400" />

</div>
## gulp 配置及启动方法

使用方法：

- 1. 首先需具备node环境，以及package.json文件，建议安装cnpm（可自行搜索如何安装cnpm）；
- 2. 在当前目录打开cmd，运行 cnpm install 安装所有依赖
- 3. 定义项目目录的结构，例如
```js
www
    examples => 示例html文件
    static
        css
        img
        js
        sass => sass源文件，将编译为css并输出到 css文件夹
js
- 4. 配置目录变量
在本文件中定义变量，例如
```js
//变量名即为命令号传入的参数值，参数名为 dir
var yxsm = {

    //basedir 代表相对于 node_modules ，项目的目录，也是根目录
    basedir : './www/', 

    // sass文件目录，相对于项目根目录
    sassdir : 'static/sass/',

    //sass编译后输出的文件目录
    cssdir  : 'static/css/'
}
```
- 5. 定义好以上变量后，在命令行运行
gulp --dir yxsm
即可启动项目，其中项目根目录默认为 index.html  如果没有建立该文件，可以手动输入文件名

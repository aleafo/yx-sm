/*
+++++++++++++++++++++++++++++++++++++++++
使用方法：

1. 首先需具备node环境，以及package.json文件，建议安装cnpm（可自行搜索如何安装cnpm）；
2. 在当前目录打开cmd，运行 cnpm install 安装所有依赖
3. 定义项目目录的结构，例如
www
    examples => 示例html文件
    static
        css
        img
        js
        sass => sass源文件，将编译为css并输出到 css文件夹
4. 配置目录变量
在本文件中定义变量，例如

//变量名即为命令号传入的参数值，参数名为 dir
var yxsm = {

    //basedir 代表相对于 node_modules ，项目的目录，也是根目录
    basedir : './www/', 

    // sass文件目录，相对于项目根目录
    sassdir : 'static/sass/',

    //sass编译后输出的文件目录
    cssdir  : 'static/css/'
}

5. 定义好以上变量后，在命令行运行
gulp --dir yxsm
即可启动项目，其中项目根目录默认为 index.html  如果没有建立该文件，可以手动输入文件名


+++++++++++++++++++++++++++++++++++++++++
*/

//引入需要的js包，也就是我们上面安装的依赖插件，并赋值给变量
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    plumber         = require('gulp-plumber'),
    browserSync     = require("browser-sync"),
    autoprefixer    = require('gulp-autoprefixer'),
    minimist        = require('minimist'),
    changed         = require('gulp-changed'),
    gulpif          = require('gulp-if'),
    sourcemaps      = require('gulp-sourcemaps'),
    watch           = require('gulp-watch'),
    // livereload      = require('gulp-livereload'),
    reload          = browserSync.reload;

var knownOptions = {
  default: {
       env: 'null', //默认参数为 开发环境  可以设置为 dev 或 product
       dir: 'yxsm'
    }  
};

var options = minimist(process.argv.slice(2), knownOptions);

/*
+++++++++++++++++++++++++++++++++++++++++
yxsm 通用模块部分
+++++++++++++++++++++++++++++++++++++++++
*/
var yxsm = {
    basedir : './',
    sassdir : 'static/sass/',
    cssdir  : 'static/css/'
}



gulp.task('sassfile',function() {
    var dir = eval('('+options.dir+')') ;
    gulp.src(dir.basedir + dir.sassdir + '*.scss')

        //开发环境生成map
        .pipe( gulpif( options.env === 'dev', sourcemaps.init() ) )

        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions','IE 9-11','Chrome >= 37'],
            cascade: true, //是否美化属性值 默认：true
            remove:true //是否去掉不必要的前缀 默认：true
        }))

        //开发环境生成map 写入
        .pipe(  gulpif( options.env === 'dev', sourcemaps.write() )  )

        .pipe(gulp.dest(dir.basedir + dir.cssdir))
        .pipe(reload({stream:true}));
});


//设置defautl命令, 用来让gulp监听对应文件的变动，一旦发现变动立即执行对应任务
gulp.task('default', function(){

    var dir = eval('('+options.dir+')') ;

    // 从这个项目的根目录启动服务器
    browserSync({
        server: {
            baseDir: dir.basedir + "/",

            //将任何其他类型的请求替换为 get 请求，方便使用模态数据
            middleware: function(req,res,next){
              req.method = 'GET';
              return next();
            }
        }
    });

    //watch 模块 替换原来的 gulp.watch 对任何新增的 或删除的 文件 也能监听到
    watch(dir.basedir + dir.sassdir + '**/*.scss', function(){
        gulp.run(['sassfile']);
    });

    watch(dir.basedir + '**/*.html', function(file){
        browserSync.reload();
    });

});

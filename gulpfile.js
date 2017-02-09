//引入需要的js包，也就是我们上面安装的依赖插件，并复制给变量
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync"),
    autoprefixer = require('gulp-autoprefixer'),
    reload = browserSync.reload;


var sassDir = 'static/sass/';
var cssDir = 'static/css/';


/*
++++++++++++++++++++++++++++++++++++++++++++++++++++

yx-sm

++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

var proyx = './';

gulp.task('sassfileyx',function() {
    gulp.src(proyx + sassDir + '*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(proyx + cssDir))
        .pipe(reload({stream:true}));
});

gulp.task('default', function(){

    browserSync({
        server: {
            baseDir: proyx + "/",
        }
    });

    gulp.watch(proyx + sassDir + '/*.scss',['sassfileyx']);
    gulp.watch(proyx + "/*.html").on("change", browserSync.reload);
});

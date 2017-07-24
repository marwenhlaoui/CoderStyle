var app = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var cssmin = require('gulp-csso');
var rename = require('gulp-rename'); 
var jsmin = require('gulp-minify');
var concat = require('gulp-concat');

/* generate html files from pug files */
app.task('html', function(){
  return app.src(['build/pug/**/*.pug','!build/pug/layout.pug','!build/pug/pages/**/*.pug','!build/pug/layout/*.pug'])
    .pipe(pug({
    	"pretty":true
  	}))
    .pipe(app.dest(''))
}); 
/* generate css skin files from less files */
app.task('css', function(){
  return app.src(['build/less/app.less'])
    .pipe(less())
    .pipe(cssmin())
  	.pipe(rename({suffix:".min"}))
  	.pipe(app.dest('dist/css'))
}); 
/* generate css files from less files and concat in coderStyle file*/
app.task('skins', function(){
  return app.src(['build/less/themes/*.less'])
    .pipe(less())
    .pipe(concat('coderStyle'))
    .pipe(cssmin())
    .pipe(rename({suffix:".min.css"}))
    .pipe(app.dest('dist/css'))
});

/* js files */
app.task('js', function() {
  app.src('build/js/*.js')
    .pipe(jsmin({
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '.min.js']
    }))
    .pipe(app.dest('dist/js'))
});
 

app.task('run', [ 'html' , 'css' ,  'skins' , 'js']);
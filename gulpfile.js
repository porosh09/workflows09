var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'), 
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');
    //jquery = require('jquery'),
   // mustache = require('mustache');
var coffeeSource = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];
var sassSources =['components/sass/style.scss']; 
var htmlSource = ['builds/development/*.html'];
gulp.task('coffee', function(){
    gulp.src(coffeeSource)
    .pipe(coffee({ bare: true })
         .on('error',gutil.log))
         .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
          gulp.src(jsSources)
            .pipe(concat('script.js'))
          .pipe(browserify())
.pipe(gulp.dest('builds/development/js'))
          .pipe(connect.reload())
          });

gulp.task('compass', function(){
          gulp.src(sassSources)
            .pipe(compass({
              sass: 'components/sass',
              image: 'builds/development/images',
              style: 'expanded'
          })
          .on('error',gutil.log))
.pipe(gulp.dest('builds/development/css'))
           .pipe(connect.reload())
          });
gulp.task('watch',function(){
    gulp.watch(coffeeSource, ['coffee']);
    gulp.watch(jsSources, ['js']);
     gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSource, ['html']);
     gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('connect',function(){
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});

gulp.task('html', function(){
    gulp.src(htmlSource)
    .pipe(connect.reload())
});

gulp.task('json', function(){
    gulp.src('builds/development/js/*.json')
    .pipe(connect.reload())
});

gulp.task('default',['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);













































































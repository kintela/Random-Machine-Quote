var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var notify = require("gulp-notify");
var bower = require('gulp-bower');
var del=require('del');
var inject=require('gulp-inject');
var runSequence=require('run-sequence');
var mainBowerFiles=require('gulp-main-bower-files');
var serve = require('gulp-serve');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
}


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('dependencies:js',function () {
    return gulp.src('./bower.json')
    .pipe(mainBowerFiles(['**/*.js']))
    .pipe(gulp.dest('./public/libs'))
});

gulp.task('dependencies:scripts',function () {
    return gulp.src('./scripts')
    .pipe(mainBowerFiles(['**/*.js']))
    .pipe(gulp.dest('./public/scripts'))
});

gulp.task('dependencies:css',function () {
    return gulp.src('./bower.json')
    .pipe(mainBowerFiles({
       overrides:{
           bootstrap:{
               main:[
                   "./dist/css/*.min.*"
               ]
           }
       } 
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('dependencies:fontawesome',function () {
    return gulp.src('./bower.json')
    .pipe(mainBowerFiles({
       overrides:{
           fontawesome:{
               main:[
                   "./css/*.min.*"
               ]
           }
       } 
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function() {
    return sass(config.sassPath + '/style.scss',{
        loadPath: [
                './resources/sass',
                config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                config.bowerDir + '/fontawesome/scss',
            ]
        })
        .on('error',sass.logError)
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('index',function(){
    var target=gulp.src('./public/index.html');
    var sources=gulp.src(['./public/styles/**/*.css','./public/libs/**/*.js'],{read:false});
    
    return target.pipe(inject(sources))
    .pipe(gulp.dest('./public'));
});

gulp.task('html',function () {
    return gulp.src("index.html")
    .pipe(gulp.dest('./public'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch([
        config.sassPath + '/**/*.scss',
        'index.html'],
         ['default']);
});

gulp.task('clean',function () {
    del('./public/**/*.*',[]);
});


gulp.task('serve', serve('public'));

gulp.task('default',function(cb){
    runSequence('clean',
    'bower',
    'dependencies:js',
    'dependencies:scripts',
    'dependencies:css',
    'dependencies:fontawesome',
    'icons',
    'css',
    'html',
    'index',
    cb);
});
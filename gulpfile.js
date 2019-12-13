const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); //Optimize images
const uglify = require('gulp-uglify'); //Minify .js
const sass =  require('gulp-sass'); //Compile Sass
const concat = require('gulp-concat'); //Concats files
const postcss = require('gulp-postcss'); //Needed for autoprefixer
const autoprefixer = require('autoprefixer'); //Plugin for postcss
const sourcemaps = require('gulp-sourcemaps'); //Needed for autoprefixer
const cleanCSS = require('gulp-clean-css'); //Minify CSS
//const postcss-clip-path-polyfill = require('postcss-clip-path-polyfill'); //Might uninstall
const cssgrace = require('cssgrace');
const fs = require('fs');
const chokidar = require('chokidar');
const  rename = require('gulp-rename');




/*
--- TOP LEVEL FUNCTOINS ---

gulp.task - Define tasks

gulp.scr - Point to files to use

gulp.dest - Points to folder to output

gulp.watch - Watch files and folders for change

*/

// Logs Message
gulp.task('message', async function(){
    return console.log(rename);
});

// HTML and CSS //

// Copy All HTML files
gulp.task('copyFiles', async function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/css/fonts/*')        
        .pipe(gulp.dest('dist/css/fonts'));
});

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
);

//Complie Sass
gulp.task('sass', () =>
    gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
);

//Auto prefix
gulp.task('autoprefixer', async function() {   
    return gulp.src('./src/css/main.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('src/css'))
  })


//Concat CSS
gulp.task('concat-css', () =>
    gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('src/css'))
)

//Minify CSS
gulp.task('minify-css', () => {
    return gulp.src('src/css/main.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'));
  });

  //
  gulp.task('cssIE', async function () {

    gulp.src('src/css/main.css')
        .pipe(postcss('cssgrace'))
        .pipe(rename('gulp.css'))
        .pipe(gulp.dest('src/css/main.css'));


        
        
});



// JavaScript //

// Minify JS
gulp.task('minify', () =>
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

//Concat Scripts and Minify Scripts
gulp.task('scripts', () =>
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
)


// Run all tasks except for Minify JS
gulp.task('default', gulp.series(
    'copyFiles','imageMin','sass','concat-css','autoprefixer','minify-css'
));
const gulp = require('gulp')

const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const obfuscate = require('gulp-obfuscate')
const uglify = require('gulp-uglify')
const imageMin = require('gulp-imagemin')

function compilarSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function comprimirImagem(){
    return gulp.src('./source/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./build/images'))
}

function formatarJavaScript(){
    return gulp.src('./source/scripts/*js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

exports.default = function () {  
    gulp.watch('./source/styles/*scss', {ignoreInitial:false}, gulp.series(compilarSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial:false}, gulp.series(formatarJavaScript))
    gulp.watch('./source/images/*', {ignoreInitial:false}, gulp.series(comprimirImagem))
}
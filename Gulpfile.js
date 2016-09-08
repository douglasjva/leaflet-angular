//definindo plugins
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

//definindo diretório dos arquivos a serem minificados
var files = "./src/**/*.js";

gulp.task('dist', function() {

	gulp.src(files)
	.pipe(concat('./leaflet-angular.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));

});
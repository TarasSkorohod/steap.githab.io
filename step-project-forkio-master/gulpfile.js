const gulp = require("gulp");
const clean = require("gulp-clean");
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const jsmin = require("gulp-jsmin");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

const cleanFolderDist = ()=>{
    return gulp.src('dist/*')
        .pipe(clean({force:true}));
}

gulp.task('cleanFolderDist', cleanFolderDist);


const scss = ()=>{
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(cleancss())
        .pipe(autoprefixer({
            "overrideBrowserslist":'last 2 version'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
};

gulp.task('scss', scss);

const js = () =>{
    return gulp.src('src/js/**/*.js')
        .pipe(jsmin())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
};
gulp.task('js', js);
const img = ()=>{
    return gulp.src('src/imgs/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.stream());
};
gulp.task('imgs',img);
gulp.task('build', gulp.series('cleanFolderDist', gulp.parallel('scss','js','imgs')));

const watch =()=>{
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    gulp.watch('src/scss/**/*.scss', scss);
    gulp.watch('*.html').on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('src/imgs/**/*' , img);
};
gulp.task('watch', watch);
gulp.task('dev', gulp.series('build','watch'));

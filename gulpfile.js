const { task, series, src, dest, watch } = require('gulp'),
    sassGlob = require('gulp-sass-glob'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    minifyInline = require('gulp-minify-inline'),
    nunjucks = require('gulp-nunjucks'),
    sitemap = require('gulp-sitemap');

task('styles', () => {
    return src('src/styles/main.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('styles.css'))
        .pipe(dest('.'));
});

task('scripts', () => {
    return src(['src/scripts/*.js'])
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(dest('.'));
});

task('html', () => {
    return src('src/views/*.twig')
        .pipe(nunjucks.compile())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(minifyInline())
        .pipe(dest('.'));
});

task('sitemap', () => {
    return src('src/public/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'https://robert.sentes.eu/'
        }))
        .pipe(dest('.'));
});

task('default', series(
    'styles',
    'scripts',
    'html',
));

task('watch', () => {
    return watch([
        'src/styles/**/*.scss',
        'src/scripts/**/*.js',
        'src/views/**/*.*',
    ], series(
        'default',
    )
    );
});

task('publish', series(
    'default',
    'sitemap',
));
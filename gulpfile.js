/// <binding />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding BeforeBuild='sass' ProjectOpened='sass:watch' />
//http://developer.telerik.com/featured/css-preprocessing-with-visual-studio/

/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    gutil = require('gulp-util'),
    download = require("gulp-download"),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    htmlmin = require('gulp-htmlmin'),
    rcs = require('gulp-rcs'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    paths = {
        src: {
            app: "./src/app/",
            root: "./src/root/"
        },
        webroot: "./",
        vendors: "./vendors/",
        dest: "./dest/",
    };


//COPY REQUIRED FILES TO SRC FOLDER FOR CLEANING
gulp.task('npm:clean', function (cb) {
    rimraf(paths.vendors, cb);
});

gulp.task('npm:copy', ['npm:clean'], function (cb) {

    var node_modules = {
        "flickity": ["./node_modules/flickity/dist/flickity.pkgd.min.js"],
        "videojs-vimeo": ["./node_modules/videojs-vimeo/dist/videojs-vimeo.min.js"],
        "videojs-youtube": ["./node_modules/videojs-youtube/dist/Youtube.min.js"],
        "videojs": ["./node_modules/video.js/dist/video.min.js", "./node_modules/video.js/dist/*lang/en.js", "./node_modules/video.js/dist/*ie8/videojs-ie8.min.js"],
        "moment": ["./node_modules/moment/min/moment.min.js"],
        "vue": ["./node_modules/vue/dist/vue.min.js"],
        "requirejs": ["./node_modules/requirejs/require.js"],
        /*minify*/ "requirejs-text": ["./node_modules/requirejs-text/text.js"],
        "typed.js": ["./node_modules/typed.js/lib/typed.min.js"],
        /*font-awesome fonts*/ "fonts": ["./node_modules/font-awesome/fonts/**"],
        "css": [
            /*animate.css*/ "./node_modules/animate.css/animate.min.css",
            /*flickity*/ "./node_modules/flickity/dist/flickity.min.css",
            /*videojs*/ "./node_modules/video.js/dist/*font/**", "./node_modules/video.js/dist/video-js.min.css",
            /*font-awesome*/ "./node_modules/font-awesome/*css/font-awesome.min.css",
            /*pickmeup*/ "./node_modules/pickmeup/css/pickmeup.css"
        ]
    };


    for (var destinationDir in node_modules) {
        let minifyJs = filter('**/text.js', { restore: true });
        let minifyCss = filter(['**/*.css'], { restore: true });

        gulp.src(node_modules[destinationDir])

            //Minify JavaScript
            .pipe(minifyJs)
            .pipe(uglify())
            .pipe(minifyJs.restore)

            //Concat Css
            .pipe(minifyCss)
            .pipe(concat('all.css'))
            .pipe(cssmin())
            .pipe(minifyCss.restore)

            .pipe(gulp.dest(paths.vendors + destinationDir));
    }
});


//COPY MAIN APP FILES
gulp.task('app:clean', function (cb) {
    rimraf(paths.dest, cb);
});
gulp.task('app:build', ['app:clean'], function (cb) {

    let jsFilter = filter('**/*.js', { restore: true });
    let htmlFilter = filter('**/*.html', { restore: true });
    let requireAndConfigFilter = filter(['**/require.js', '**/config.js'], { restore: true });

    gulp.src([
            paths.vendors + 'requirejs/require.js',
            paths.src.app + '**',
            '!' + paths.src.app + 'css/**', '!' + paths.src.app + 'css/',
            '!' + paths.src.app + '**/{errors.js,polyfils.js}'
        ])
        //Concat requireandconfig
        .pipe(requireAndConfigFilter)
        .pipe(concat('requireandconfig.js'))
        .pipe(requireAndConfigFilter.restore)

        ////Minify JavaScript
        //.pipe(jsFilter)
        //.pipe(uglify())
        //.pipe(jsFilter.restore)
        
        //Minify HTML
        .pipe(htmlFilter)
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(paths.dest));




    gulp.src([paths.src.app + '**/errors.js', paths.src.app + '**/polyfils.js'])
        .pipe(concat('errorandpolyfils.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest));

    

    gulp.src([paths.src.root + '**', '!'+paths.src.root + 'Index.html']).pipe(gulp.dest(paths.webroot));

    

    let cssFilter = filter('**/*.css', { restore: true });
    let sassFilter = filter('**/*.scss', { restore: true });
    gulp.src([paths.src.root + 'Index.html'])
        .pipe(inject(
            gulp.src([paths.src.app + 'css/**'])
                //Compile SASS
                .pipe(sassFilter)
                .pipe(sass().on('error', sass.logError))
                .pipe(sassFilter.restore)
                //Minify CSS
                .pipe(cssFilter)
                .pipe(cssmin({ keepSpecialComments: 0 })) //https://stackoverflow.com/a/31959916
                .pipe(cssFilter.restore)
            ,{
                name: 'style',
                transform: function (filePath, file) {
                    // return file contents as string
                    return '<style> ' + file.contents + ' </style>';
                }
            }
        ))
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.webroot));
});

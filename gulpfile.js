"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    browserify  = require("browserify"),
    tsify       = require("tsify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    browserSync = require('browser-sync').create();
    
//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {

    var config =  { formatter: "verbose", emitError: (process.env.CI) ? true : false };
    
    return gulp.src([
        "source/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint(config))
    .pipe(tslint.report());

});

//******************************************************************************
//* BUILD TEST
//******************************************************************************
var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function() {
    return gulp.src([
            "source/**/**.ts",
            "typings/index.d.ts/"],
            { base: "." }
        )
        .pipe(tsTestProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js
        .pipe(gulp.dest("."));
});

//******************************************************************************
//* BUILD DEV
//******************************************************************************
gulp.task("build", function() {
  
    var libraryName = "myapp";
    var mainTsFilePath = "source/main.ts";
    var outputFolder   = "dist/";
    var outputFileName = libraryName + ".min.js";

    var bundler = browserify({
        debug: true,
        standalone : libraryName
    });
    
    return bundler
        .add(mainTsFilePath)
        .plugin(tsify, { noImplicitAny: true })
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))        
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(outputFolder));
});

//******************************************************************************
//* DEV SERVER
//******************************************************************************
gulp.task("watch", ["default"], function () {
    
    browserSync.init({
        server: "."
    });
    
    gulp.watch([ "source/**/**.ts", "test/**/*.ts"], ["default"]);
    gulp.watch("dist/*.js").on('change', browserSync.reload); 
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
    runSequence("lint", "build-test", "build", cb);
});
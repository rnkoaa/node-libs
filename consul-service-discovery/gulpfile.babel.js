"use strict";


import gulp from "gulp";
import del from "del";
import debug from "gulp-debug";
import inject from "gulp-inject";
import tsc from "gulp-typescript";
import tslint from "gulp-tslint";
import runSequence from "run-sequence";
import sourcemaps from 'gulp-sourcemaps';
const tsProject = tsc.createProject("tsconfig.json");


gulp.task("copy-env", function() {
    return gulp.src(".env").pipe(gulp.dest("dist/"));
});

gulp.task("lint-ts", function() {
    return gulp
        .src(["lib/**/*.ts", "!lib/test/*/**}"])
        .pipe(
            tslint({
                formatter: "verbose"
            })
        )
        .pipe(tslint.report());
});

// var tsProject = tsc.createProject("tsconfig.json");
gulp.task("compile-ts", ["lint-ts"], function() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

// gulp.task("watch", function() {
//     return gulp.watch(["src/**/*.ts", "!src/test/*/**}"], ["compile-ts"]);
// });

gulp.task("default", function(done) {
    runSequence("clean", ["compile-ts", "copy-env"]);
    done();
});

gulp.task("clean", function() {
    return del(["dist"]);
});

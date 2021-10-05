const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
sass.compiler = require("node-sass");
const broserify = require("gulp-browserify");
var babelify = require("babelify");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/source.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js",
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      broserify({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

function watchFiles() {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
}

const dev = gulp.series(styles, js, watchFiles);
export default dev;

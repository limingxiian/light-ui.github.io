const path = require('path');
const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const bump = require('gulp-bump');
const merge2 = require('merge2');
const through2 = require('through2');

const babelConfig = {
  presets: [['@babel/preset-env'], '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-transform-runtime', { helpers: false }],
  ],
};

const libDir = path.join(process.cwd(), 'lib');
const source = [
  './src/**/*.js',
  './src/**/*.jsx',
  './src/**/*.ts',
  './src/**/*.tsx',
  '!./src/**/*.test.tsx',
  '!./src/**/demo',
  '!./src/**/demo/**',
];

gulp.task('less', function() {
    const lessStream = gulp.src('./src/**/*.less');

    const copyLess = lessStream
        .pipe(
            through2.obj(function(file, encoding, next) {
                this.push(file.clone());
                next();
            }),
        )
        .pipe(gulp.dest(libDir));
    // const lessToCss = lessStream
    //     .pipe(
    //         less({
    //             javascriptEnabled: true,
    //             plugins: [
    //                 new NpmImportPlugin({ prefix: '~' }),
    //                 new LessPluginAutoPrefix({ browsers: ['last 2 versions', 'IE 9'] }),
    //             ],
    //             modifyVars: {
    //                 'root-entry-name': 'default',
    //             },
    //         }),
    //     )
    //     .pipe(gulp.dest(libDir));

    return merge2([copyLess]);
})

gulp.task('js', function() {
    const jsFilesStream = babelify(gulp.src(source));
    return jsFilesStream;
});

function babelify(js) {
    let stream = js
        .pipe(sourcemaps.init())
        .pipe(babel(babelConfig))
        .pipe(
            through2.obj(function(file, encoding, next) {
                this.push(file.clone());
                if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                    const content = file.contents.toString(encoding);
                    file.contents = Buffer.from(
                        content
                            .replace(/\/style\/?'/g, "/style/css'")
                            .replace(/\/style\/?"/g, '/style/css"')
                            .replace(/\.less/g, '.css'),
                    );
                    file.path = file.path.replace(/index\.js/, 'css.js');
                    this.push(file);
                }
                next();
            }),
        )
        .pipe(sourcemaps.write('.'));

    return stream.pipe(gulp.dest(libDir));
}

// 多任务合并执行
gulp.task("default", gulp.series('less', 'js'));

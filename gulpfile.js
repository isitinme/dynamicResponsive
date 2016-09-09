// ECMAScript® 2016+
// const isProd = process.env.NODE_ENV === 'production';

// Plugins
// import gulp from 'gulp'; // node 6.5.0 currently not supported
const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();
const path = require('path');
const webpack = require('webpack');
const bs = require('browser-sync').create();

const webpackConfig = {
  entry: {
    'dynamic-responsive': [
      path.resolve(__dirname, './dynamic-responsive.js'),
    ],
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  watch: false,
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].min.js',
    library: 'DynamicResponsive',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      // https://github.com/babel/babel-loader#options
      loader: 'babel?presets[]=es2015&cacheDirectory=true',
    }],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      // warnings: false,
      compress: { // or compressor
        warnings: false,
      },
      output: {
        comments: false,
        // semicolons: true
      },
    }),
  ],
};

gulp.task('clean', () => del(['./dynamic-responsive.min.js', './dynamic-responsive.min.js.map']));

gulp.task('lint:scripts', () =>
  gulp.src([
    '!node_modules/**',
    '!./*.min.*',
    './**/*.js',
    'gulpfile.js',
  ])
  .pipe($.eslint())
  .pipe($.eslint.format())
  // .pipe($.eslint.failAfterError())
  // .pipe($.if(!browserSync.active, $.eslint.failOnError()));
);

gulp.task('scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }
    $.util.log('[webpack]', stats.toString({
      // output options
      // https://github.com/webpack/docs/wiki/node.js-api
      chunks: false,
    }));
    $.util.log('[webpack]', 'Packed successfully!');
  });

  done();
});

const watch = () => {
  bs.init({
    notify: false,
    logPrefix: 'watch',
    https: true,
    server: './',
    files: [
      './*',
      '!./*.min.*',
    ],
    // port: 3000,
    // browser: 'chrome',
  });

  gulp.watch([
    '!./*.min.*', './dynamic-responsive.js',
  ], gulp.series('scripts'));
  // ], gulp.series('lint:scripts', 'scripts'));
};

gulp.task('serve',
  gulp.series('clean',
    'lint:scripts',
    'scripts',
    watch
  )
);

// Build production files, the default task
gulp.task('default', gulp.series('clean', gulp.series('lint:scripts', 'scripts')));

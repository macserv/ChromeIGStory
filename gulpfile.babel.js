import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);
    
    plugins.util.log('[webpack]', stats.toString());
    
    cb();
  });
});

gulp.task('event-js', ['clean'], (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);
    
    plugins.util.log('[webpack]', stats.toString());
    
    cb();
  });
});

gulp.task('content-js', ['clean'], (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);
    
    plugins.util.log('[webpack]', stats.toString());
    
    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp.src('popup/src/index.html')
  .pipe(plugins.rename('popup.html'))
  .pipe(gulp.dest('./build/html'))
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json')
  .pipe(gulp.dest('./build'));
});

// Copy all static assets
gulp.task('copy-static', ['clean'], () => {
  gulp.src('static/img/**')
  .pipe(gulp.dest('build/img'));
  
  gulp.src('static/html/**')
  .pipe(gulp.dest('build/html'));
  
  gulp.src('static/css/**')
  .pipe(gulp.dest('build/css'));
  
  gulp.src('static/js/**')
  .pipe(gulp.dest('build/js'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'copy-static', 'popup-js', 'popup-html', 'event-js', 'content-js']);

gulp.task('watch', ['default'], () => {
  gulp.watch('manifest.json', ['build']);
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('content/**/*', ['build']);
  gulp.watch('event/**/*', ['build']);
  gulp.watch('utils/**/*', ['build']);
});

gulp.task('default', ['build']);


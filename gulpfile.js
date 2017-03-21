const buildConfig = require('./build.config.js');
const elixir = require('laravel-elixir');
const gulp = require('gulp');
const git = require('gulp-git');
const filter = require('gulp-filter');
const tagVersion = require('gulp-tag-version');
const bump = require('gulp-bump');
const args = require('yargs').argv;
const site = args.site || 'front';

require('laravel-elixir-vue-2');
require('laravel-elixir-remove');
require('laravel-elixir-replace');

// ------------------------------------------------------------------------------------

// Get current config (admin || front)
if (typeof buildConfig.site[site] === 'undefined') {
    console.log(site + ' configuration not found');
    return;
}

// Get config and override elixir
const config = buildConfig.site[site];
elixir.config.assetsPath = config.assetsPath;
elixir.config.publicPath = config.publicPath;
elixir.config.css.autoprefix.options.browsers = ['last 15 versions'];

config.app_files.css.push(config.assetsPath + '/css');
config.app_files.css.push(config.publicPath + '/assets/css/app.css');
config.app_files.js.push(config.publicPath + '/assets/js/app.js');

// ------------------------------------------------------------------------------------

elixir((mix) => {

    if (config.clear)
        mix.remove(config.publicPath + '/assets/**');

    // Proceed to copy operations
    for (var key in config.app_files.copyfiles) {
        if (config.app_files.copyfiles.hasOwnProperty(key)) {
            mix.copy(config.app_files.copyfiles[key][0], config.app_files.copyfiles[key][1]);
        }
    }

    // Proceed to CSS / JS operations
    mix
        .sass(config.app_files.sass, config.publicPath + '/assets/css/app.css')
        .styles(config.app_files.css, config.publicPath + '/assets/css', './')
        .webpack('main.js', config.publicPath + '/assets/js/app.js')
        .scripts(config.app_files.js, config.publicPath + '/assets/js', './');

    var replace = [
        ['{{version}}', Date.now()]
    ];
    mix.replace(config.assetsPath + '/' + config.app_files.index, replace, config.publicPath);
});

// ------------------------------------------------------------------------------------

// Override SASS watch path
elixir.tasks.byName('sass').forEach((task) => {
    task.watch(config.sass_watch);
});

// ------------------------------------------------------------------------------------

// Version increments
gulp.inc = (importance) => {
    return gulp
        .src(buildConfig.version)
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('Package version ' + importance))
        .pipe(filter(buldConfig.version))
        .pipe(tagVersion());
};

gulp.task('patch', () => {
    return gulp.inc('patch');
});
gulp.task('feature', () => {
    return gulp.inc('minor');
});
gulp.task('release', () => {
    return gulp.inc('major');
});
// Karma configuration
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'commonjs'],
    files: [
      'index.js',
      'lib/neks-tick.js',
      'test/test.js'
    ],
    preprocessors: {
      'index.js': ['commonjs'],
      'lib/neks-tick.js': ['commonjs', 'coverage'],
      'test/test.js': ['commonjs']
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-commonjs',
      'karma-coverage'
    ],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'lcov', dir: 'coverage', subdir: '.' },
        { type: 'text-summary', dir: 'coverage', subdir: '.' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
};

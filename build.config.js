module.exports = {
    proxy: {
        enabled: false,
        domain: 'http://localhost'
    },
    site: {
        front: {
            assetsPath: 'src',
            publicPath: 'public',
            sass_watch: 'src/**/*.scss',
            clear: false,

            app_files: {
                index: 'index.html',
                js: [],

                sass: ['application.scss'],

                css: [],

                copyfiles: [
                    [
                        [
                            'node_modules/font-awesome/fonts',
                            'src/assets/fonts'
                        ],
                        'public/assets/fonts'
                    ],
                    [
                        ['src/assets/**'],
                        'public/assets/'
                    ]
                ]
            }
        }
    },

    version: [
        './bower.json',
        './package.json'
    ]

};
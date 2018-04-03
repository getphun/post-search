module.exports = function(grunt) {
    
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'js/post-search.min.js': 'js/post-search.js'
                },
                options: {
                    compress: true,
                    report: 'gzip',
                    preserveComments: false
                }
            }
        },
        
        compress: {
            gzip: {
                options: {
                    mode: 'gzip',
                    level: 9
                },
                files: {
                    'js/post-search.min.js.gz': 'js/post-search.min.js'
                }
            },
            brotli: {
                options: {
                    mode: 'brotli',
                    brotli: {
                        mode: 1,
                        quality: 11
                    }
                },
                files: {
                    'js/post-search.min.js.br': 'js/post-search.min.js'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    grunt.registerTask('dist', [
        'uglify:dist',
        'compress:gzip',
        'compress:brotli'
    ]);
}
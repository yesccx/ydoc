var path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: 'error',
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'));
    },
    runtimeCompiler: true,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                'target': process.env.VUE_APP_API_BASE_URL,
                'changeOrigin': true,
                'ws': false,
                pathRewrite: {// 重写路径
                    '/': ''
                }
            }
        }
    },
    publicPath: '/',
    css: {
        loaderOptions: {
            scss: {
                data: '@import "~@/assets/scss/theme.scss";'
            }
        }
    }
};
var path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    lintOnSave: 'error',
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'));
        config.plugins.delete('prefetch');
    },
    configureWebpack: config => {
        if (!isProduction) {
            return true;
        }

        // 开启gzip压缩
        const CompressionWebpackPlugin = require('compression-webpack-plugin');
        config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.json$|\.css/,
            threshold: 10240,
            minRatio: 0.8
        }));
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
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lessToJs = require('less-vars-to-js');

const themer = lessToJs(fs.readFileSync(path.join(__dirname, './components/nanoReset.less'), 'utf8'));

const extractStyle = new ExtractTextPlugin({
  disable: false,
  allChunks: true,
  filename: '[name].css',
});

function getPostConfig(options) {
  const plugins = [];
  if (options.needNameSpace) {
    plugins.push('');
  }
  return {
    plugins,
  };
}

function getCssLoader(cssType, postcssConfig) {
  if (process.env.NODE_ENV === 'production') {
    return extractStyle.extract({
      fallback: 'style-loader',
      use: ['css-loader?minimize', {
        loader: 'postcss-loader',
        options: postcssConfig,
      }, cssType],
    });
  }
  return ['style-loader', 'css-loader', {
    loader: 'postcss-loader',
    options: postcssConfig,
  }, cssType];
}

module.exports = function webpackConfig(defaultConfig) {
  const config = defaultConfig;
  const postcssConfig = getPostConfig({});

  if (process.env.NODE_ENV === 'production') {
    config.externals = {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    };
  }

  config.resolve.alias = {
    antd: path.resolve(__dirname),
    react: path.resolve(__dirname, 'node_modules/react'),
    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
  };

  // delete less&sass loader
  config.module.rules.splice(3, 3);
  // add less&sass loader

  config.module.rules.push({
    test: /\.css/,
    use: getCssLoader('sass-loader', postcssConfig),
  });

  config.module.rules.push({
    test: /\.less$/,
    use: getCssLoader(`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(themer)}}`, postcssConfig),
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: getCssLoader('sass-loader', postcssConfig),
  });

  config.plugins.push(extractStyle);
};
